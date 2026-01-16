
import React from 'react';
import { Destination, Vehicle } from './types';

export const INDONESIAN_REGIONS = [
  "Aceh", "Ambon", "Balikpapan", "Bandar Lampung", "Bandung", "Banjarmasin", "Banyuwangi", "Batam", "Bekasi", "Bengkulu", 
  "Bogor", "Bontang", "Bukittinggi", "Cilegon", "Cimahi", "Cirebon", "Denpasar", "Depok", "Dumai", "Gorontalo", 
  "Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Jambi", "Jayapura", "Kediri", 
  "Kendari", "Kupang", "Madiun", "Magelang", "Makassar", "Malang", "Manado", "Mataram", "Medan", "Mojokerto", 
  "Padang", "Palangkaraya", "Palembang", "Palu", "Pangkalpinang", "Pekanbaru", "Pontianak", "Probolinggo", "Salatiga", 
  "Samarinda", "Semarang", "Serang", "Sibolga", "Singkawang", "Solo", "Sorong", "Sukabumi", "Surabaya", "Surakarta", 
  "Tangerang", "Tangerang Selatan", "Tanjung Pinang", "Tarakan", "Tasikmalaya", "Tegal", "Ternate", "Tidore", "Tomohon", 
  "Tual", "Yogyakarta"
].sort();

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Candi Borobudur',
    location: 'Magelang, Jawa Tengah',
    description: 'Candi Buddha terbesar di dunia dan Situs Warisan Dunia UNESCO. Simbol kemegahan sejarah Indonesia dengan relief yang memukau.',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    weather: 'Cerah Berawan',
    rating: 4.9,
    coordinates: { lat: -7.6079, lng: 110.2038 }
  },
  {
    id: '2',
    name: 'Raja Ampat',
    location: 'Papua Barat',
    description: 'Surga bawah laut dengan biodiversitas tertinggi di dunia. Gugusan pulau karst yang memanjakan mata bagi para penyelam.',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&q=80&w=800',
    weather: 'Cerah',
    rating: 5.0,
    coordinates: { lat: -0.2222, lng: 130.5000 }
  },
  {
    id: '3',
    name: 'Gunung Bromo',
    location: 'Jawa Timur',
    description: 'Gunung berapi aktif dengan pemandangan sunrise terbaik dan lautan pasir yang ikonik di kawasan TNBTS.',
    image: 'https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?auto=format&fit=crop&q=80&w=800',
    weather: 'Dingin/Berkabut',
    rating: 4.8,
    coordinates: { lat: -7.9425, lng: 112.9531 }
  },
  {
    id: '4',
    name: 'Tanah Lot',
    location: 'Tabanan, Bali',
    description: 'Pura yang terletak di atas batu karang besar di tepi laut. Lokasi magis untuk melihat matahari terbenam.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    weather: 'Hujan Ringan',
    rating: 4.7,
    coordinates: { lat: -8.6212, lng: 115.0868 }
  },
  {
    id: '5',
    name: 'Pulau Komodo',
    location: 'NTT',
    description: 'Habitat asli kadal terbesar di dunia, Komodo. Memiliki Pantai Merah (Pink Beach) yang sangat indah.',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800',
    weather: 'Panas Terik',
    rating: 4.9,
    coordinates: { lat: -8.5891, lng: 119.4477 }
  },
  {
    id: '6',
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    description: 'Danau vulkanik terbesar di dunia dengan Pulau Samosir di tengahnya. Kaya akan budaya Batak.',
    image: 'https://images.unsplash.com/photo-1571738229415-51fd7f1ebd84?auto=format&fit=crop&q=80&w=800',
    weather: 'Sejuk',
    rating: 4.8,
    coordinates: { lat: 2.6145, lng: 98.8406 }
  },
  {
    id: '7',
    name: 'Ubud',
    location: 'Gianyar, Bali',
    description: 'Pusat seni dan budaya di Bali. Terkenal dengan sawah terasering Tegalalang dan suasana yang tenang.',
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=800',
    weather: 'Cerah Berawan',
    rating: 4.9,
    coordinates: { lat: -8.5069, lng: 115.2625 }
  },
  {
    id: '8',
    name: 'Gunung Rinjani',
    location: 'Lombok, NTB',
    description: 'Gunung berapi tertinggi kedua di Indonesia dengan Danau Segara Anak yang mempesona di puncaknya.',
    image: 'https://images.unsplash.com/photo-1559628233-eb1b1a45564b?auto=format&fit=crop&q=80&w=800',
    weather: 'Sangat Dingin',
    rating: 4.9,
    coordinates: { lat: -8.4114, lng: 116.4572 }
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Matic Scooter',
    type: 'Motorcycle',
    description: 'Lincah untuk menembus kemacetan kota. Cocok untuk cuaca cerah.',
    icon: '🛵',
    isGoodForRain: false,
    isGoodForHeat: true
  },
  {
    id: 'v2',
    name: 'City Car',
    type: 'Car',
    description: 'Nyaman dan hemat bahan bakar. Cocok untuk perjalanan keluarga kecil.',
    icon: '🚗',
    isGoodForRain: true,
    isGoodForHeat: true
  },
  {
    id: 'v3',
    name: 'Adventure SUV',
    type: 'SUV',
    description: 'Tangguh di segala medan dan cuaca ekstrem. Ruang luas.',
    icon: '🚙',
    isGoodForRain: true,
    isGoodForHeat: true
  }
];

export const BATIK_SILHOUETTE = (
  <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-10 absolute pointer-events-none">
    <path d="M100 0 C 120 40, 160 40, 200 20 C 180 60, 180 100, 200 140 C 160 120, 120 120, 100 160 C 80 120, 40 120, 0 140 C 20 100, 20 60, 0 20 C 40 40, 80 40, 100 0" fill="#2d5a27" />
  </svg>
);
