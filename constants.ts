import { OptionType, ColorOptionType } from './types';

export const PHOTO_SIZES: OptionType[] = [
  { value: '2x3 cm', label: '2x3 cm' },
  { value: '3x4 cm', label: '3x4 cm' },
  { value: '4x6 cm', label: '4x6 cm' },
  { value: '5x5 cm', label: '5x5 cm' },
];

export const BACKGROUND_COLORS: ColorOptionType[] = [
  { value: 'red', label: 'Red', className: 'bg-red-600' },
  { value: 'blue', label: 'Blue', className: 'bg-blue-600' },
  { value: 'dark blue', label: 'Biru Gelap', className: 'bg-blue-900' },
  { value: 'white', label: 'White', className: 'bg-white border border-gray-400' },
  { value: 'gray', label: 'Gray', className: 'bg-gray-400' },
  { value: 'dark gray', label: 'Abu-abu Gelap', className: 'bg-gray-800' },
  { value: 'black', label: 'Hitam', className: 'bg-black' },
];

export const EXPRESSIONS: OptionType[] = [
  { value: 'original', label: 'Asli (dari foto awal)' },
  { value: 'a neutral expression', label: 'Netral' },
  { value: 'a slight, closed-mouth smile', label: 'Sedikit Tersenyum' },
];

export const LIGHTING_OPTIONS: OptionType[] = [
  { value: 'professional studio lighting', label: 'Studio Standar' },
  { value: 'soft natural lighting', label: 'Pencahayaan Alami' },
  { value: 'softbox lighting effect', label: 'Efek Lampu Softbox' },
  { value: 'Rembrandt lighting, creating a small triangle of light on the cheek opposite the main light source', label: 'Rembrandt Lighting' },
  { value: 'butterfly lighting, creating a butterfly-shaped shadow under the nose', label: 'Butterfly Lighting' },
  { value: 'split lighting, where one side of the face is well-lit and the other is in shadow', label: 'Split Lighting' },
  { value: 'loop lighting, creating a small loop-shaped shadow of the nose on the cheek', label: 'Loop Lighting' },
];

export const OUTFIT_OPTIONS: OptionType[] = [
    { value: 'Seragam SMA perempuan berhijab, dengan kemeja putih lengan panjang, rok abu-abu panjang, dasi abu-abu, dan jilbab putih rapi', label: 'SMA Putri (Hijab)' },
    { value: 'Seragam SMA perempuan non-hijab, dengan kemeja putih lengan pendek, rok abu-abu di bawah lutut, dan dasi abu-abu rapi', label: 'SMA Putri (Non-Hijab)' },
    { value: 'Seragam SMA laki-laki, dengan kemeja putih lengan pendek, celana panjang abu-abu, dan dasi abu-abu rapi', label: 'SMA Putra' },
    { value: 'Seragam SMP perempuan berhijab, dengan kemeja putih lengan panjang, rompi biru, dasi biru, dan jilbab putih rapi', label: 'SMP Putri (Hijab)' },
    { value: 'Seragam SMP perempuan non-hijab, dengan kemeja putih lengan pendek, rok biru di bawah lutut, dan dasi biru rapi', label: 'SMP Putri (Non-Hijab)' },
    { value: 'Seragam SMP laki-laki, dengan kemeja putih lengan pendek, celana pendek biru, dan dasi biru rapi', label: 'SMP Putra' },
    { value: 'Seragam SD perempuan berhijab, dengan kemeja putih lengan panjang, rok merah panjang, dasi merah, dan jilbab putih rapi', label: 'SD Putri (Hijab)' },
    { value: 'Seragam SD perempuan non-hijab, dengan kemeja putih lengan pendek, rok merah di bawah lutut, dan dasi merah rapi', label: 'SD Putri (Non-Hijab)' },
    { value: 'Seragam SD laki-laki, dengan kemeja putih lengan pendek, celana pendek merah, dan dasi merah rapi', label: 'SD Putra' },
];