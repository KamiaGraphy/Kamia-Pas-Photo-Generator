import { GoogleGenAI, Modality } from '@google/genai';
import { PhotoConfig } from '../types';

export const generatePasPhoto = async (
    config: PhotoConfig,
    imageData: { base64: string; mimeType: string },
    outfitImageData?: { base64: string; mimeType: string },
    logoImageData?: { base64: string; mimeType: string }
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const parts = [];

    // Main photo (always first)
    const imagePart = {
      inlineData: {
        mimeType: imageData.mimeType,
        data: imageData.base64,
      },
    };
    parts.push(imagePart);
    
    let outfitPromptSegment = `Change the person's clothing to ${config.outfit}. The new outfit should look natural and professional, suitable for a passport photo.`;
    let logoPromptSegment = '';
    let mainPromptIntro = 'Edit this passport photo.';

    // Optional outfit reference image (second image if present)
    if (outfitImageData) {
        const outfitImagePart = {
            inlineData: {
                mimeType: outfitImageData.mimeType,
                data: outfitImageData.base64,
            },
        };
        parts.push(outfitImagePart);
        mainPromptIntro = 'Edit the first image, which is the passport photo.'
        outfitPromptSegment = `Change the person's clothing to match the outfit in the second image provided. Also consider this description for context or specific details: '${config.outfit}'. The new outfit should look natural and professional, suitable for a passport photo.`
    }

    // Optional logo image (third or second image if present)
    if (logoImageData) {
        const logoImagePart = {
            inlineData: {
                mimeType: logoImageData.mimeType,
                data: logoImageData.base64,
            },
        };
        parts.push(logoImagePart);
        // Adjust prompt based on number of images
        const logoImageIndex = outfitImageData ? 'third' : 'second';
        logoPromptSegment = `- **Logo:** Add the logo from the ${logoImageIndex} image onto the left shirt pocket of the new outfit. The logo should be small, clear, and positioned naturally on the pocket.`
    }

    const expressionInstruction = config.expression === 'original'
        ? `- **Expression:** Maintain the person's original expression. Do not alter their expression.`
        : `- **Expression:** Maintain the person's original expression. If it needs slight adjustment for official use, make it ${config.expression}, but do not alter their identity.`;

    const prompt = `${mainPromptIntro}
    - **Crucially, do not change the person's face, facial features, or identity. Only modify the background, their clothing, and the lighting as specified below.**
    - **Size:** The final photo should have an aspect ratio appropriate for a ${config.size} print.
    - **Background:** Change the background to a solid, uniform ${config.backgroundColor} color. Remove any existing background elements, shadows, or textures.
    - **Outfit:** ${outfitPromptSegment}
    ${logoPromptSegment}
    ${expressionInstruction}
    - **Lighting:** Adjust the lighting to be ${config.lighting}, ensuring the face is evenly illuminated with no harsh shadows.
    - **Composition:** Ensure it remains a head-and-shoulders portrait. The head should be centered, and the top of the shoulders visible.
    - **Style:** Photorealistic. The result must look like a real photograph, not an illustration or painting. Ensure the final image is of very high quality.`;

    const textPart = { text: prompt };
    parts.push(textPart);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error('No image was generated. The response may have been blocked due to safety settings or an invalid prompt.');

  } catch (error) {
    console.error("Error generating photo with Gemini:", error);
    if (error instanceof Error) {
        return Promise.reject(error.message);
    }
    return Promise.reject("An unknown error occurred while generating the photo.");
  }
};