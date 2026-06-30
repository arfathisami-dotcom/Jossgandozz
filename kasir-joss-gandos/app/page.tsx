"use client";

import React, { useState } from "react";

interface Menu {
  nama: string;
  harga: number;
  kategori: string;
}

export default function KasirJossGandos() {
  const [search, setSearch] = useState("");
  const [kategoriTerpilih, setKategoriTerpilih] = useState("Semua");
  const [keranjang, setKeranjang] = useState<{ menu: Menu; jumlah: number }[]>([]);

  const daftarMenu: Menu[] = [
    // --- KATEGORI: MAKANAN (Gabungan Bakso, Mie Ayam, Ayam, Bebek, & Extra) ---
    { nama: "Bakso Super Tetelan Joss", harga: 22000, kategori: "Makanan" },
    { nama: "Mie Ayam Tetelan", harga: 20000, kategori: "Makanan" },
    { nama: "Ayam Bakar + Nasi", harga: 25000, kategori: "Makanan" },
    { nama: "Lele Goreng Kriuk + Nasi", harga: 22000, kategori: "Makanan" },
    { nama: "Ayam Goreng Kriuk + Nasi", harga: 25000, kategori: "Makanan" },
    { nama: "Bebek Kriuk + Nasi", harga: 38000, kategori: "Makanan" },
    { nama: "Ayam Gepuk + Nasi", harga: 27000, kategori: "Makanan" },
    { nama: "Bebek Bakar + Nasi", harga: 38000, kategori: "Makanan" },
    { nama: "Bakso Urat", harga: 20000, kategori: "Makanan" },
    { nama: "Bakso Kecil", harga: 15000, kategori: "Makanan" },
    { nama: "Bakso Telur", harga: 20000, kategori: "Makanan" },
    { nama: "Mie Ayam", harga: 15000, kategori: "Makanan" },
    { nama: "Mie Ayam Bakso", harga: 20000, kategori: "Makanan" },
    { nama: "Mie Ayam Bakso Urat", harga: 22000, kategori: "Makanan" },
    { nama: "Mie Ayam Bakso Telur", harga: 22000, kategori: "Makanan" },
    { nama: "Tumis Kangkung", harga: 15000, kategori: "Makanan" },
    { nama: "Nasi Goreng Telur Dadar/Ceplok", harga: 20000, kategori: "Makanan" },
    { nama: "Mie Goreng Telur Dadar/Ceplok", harga: 20000, kategori: "Makanan" },
    { nama: "Tempe Crispy", harga: 12000, kategori: "Makanan" },
    { nama: "Tahu Bakso", harga: 14000, kategori: "Makanan" },
    { nama: "Extra Nasi Putih", harga: 6000, kategori: "Makanan" },

    // --- KATEGORI: MINUMAN ---
    { nama: "Cendol Nangka (S)", harga: 13000, kategori: "Minuman" },
    { nama: "Cendol Nangka (M)", harga: 16000, kategori: "Minuman" },
    { nama: "Cendol Nangka (L)", harga: 20000, kategori: "Minuman" },
    { nama: "Cendol Durian (S)", harga: 18000, kategori: "Minuman" },
    { nama: "Cendol Durian (M)", harga: 22000, kategori: "Minuman" },
    { nama: "Cendol Durian (L)", harga: 25000, kategori: "Minuman" },
    { nama: "Es Teler Spesial", harga: 20000, kategori: "Minuman" },
    { nama: "Es Teler Keju", harga: 25000, kategori: "Minuman" },
    { nama: "Es Kelapa Jeruk", harga: 18000, kategori: "Minuman" },
    { nama: "Es Kelapa Gula Aren", harga: 18000, kategori: "Minuman" },
    { nama: "Juss Apokade", harga: 18000, kategori: "Minuman" },
    { nama: "Juss Mangga", harga: 18000, kategori: "Minuman" },
    { nama: "Teh Botol + Es", harga: 7000, kategori: "Minuman" },
    { nama: "Teh Obeng size M", harga: 7000, kategori: "Minuman" },
    { nama: "Air Mineral", harga: 7000, kategori: "Minuman" },
    { nama: "Extra Es", harga: 3000, kategori: "Minuman" }
  ];

  const kategoriList = ["Semua", "Makanan", "Minuman"];

  // Filter Menu berdasarkan Search Bar dan Tombol Kategori
  const menuTersaring = daftarMenu.filter((menu) => {
    const cocokSearch = menu.nama.toLowerCase().includes(search.toLowerCase());
    const cocokKategori = kategoriTerpilih === "Semua" || menu.kategori === kategoriTerpilih;
    return cocokSearch && cocokKategori;
  });

  const tambahKeKeranjang = (menu: Menu) => {
    setKeranjang((prev) => {
      const ada = prev.find((item) => item.menu.nama === menu.nama);
      if (ada) {
        return prev.map((item) =>
          item.menu.nama === menu.nama ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }
      return [...prev, { menu, jumlah: 1 }];
    });
  };

  const kurangiDariKeranjang = (namaMenu: string) => {
    setKeranjang((prev) =>
      prev
        .map((item) =>
          item.menu.nama === namaMenu ? { ...item, jumlah: item.jumlah - 1 } : item
        )
        .filter((item) => item.jumlah > 0)
    );
  };

  const totalBelanja = keranjang.reduce((total, item) => total + item.menu.harga * item.jumlah, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-wide">JOSS GANDOS</h1>
        <p className="text-sm text-gray-500 font-medium">Sistem Kasir Aplikasi Menu Moka</p>
      </header>

      {/* SEARCH BAR & KATEGORI */}
      <div className="max-w-4xl mx-auto mb-6 bg-white p-4 rounded-xl shadow-sm space-y-4">
        <input
          type="text"
          placeholder="Cari menu makanan atau minuman..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <div className="flex flex-wrap gap-2">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriTerpilih(kat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                kategoriTerpilih === kat
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DAFTAR MENU */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold border-b pb-2 border-gray-300">Daftar Menu</h2>
          {menuTersaring.length === 0 ? (
            <p className="text-gray-500 italic">Menu tidak ditemukan...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuTersaring.map((menu) => (
                <div
                  key={menu.nama}
                  onClick={() => tambahKeKeranjang(menu)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-green-500 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {menu.kategori}
                    </span>
                    <h3 className="font-bold text-base text-gray-900">{menu.nama}</h3>
                  </div>
                  <p className="text-green-700 font-bold mt-2 text-right">
                    Rp {menu.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STRUK / KERANJANG */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 h-fit sticky top-4">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 border-gray-300 text-center">Struk Belanja</h2>
          {keranjang.length === 0 ? (
            <p className="text-gray-400 text-center py-8 italic">Keranjang masih kosong</p>
          ) : (
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {keranjang.map((item) => (
                  <div key={item.menu.nama} className="flex justify-between items-center text-sm border-b pb-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.menu.nama}</p>
                      <p className="text-xs text-gray-500">
                        {item.jumlah} x Rp {item.menu.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={() => kurangiDariKeranjang(item.menu.nama)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-2 py-0.5 rounded text-xs"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-800 min-w-[16px] text-center">{item.jumlah}</span>
                      <button
                        onClick={() => tambahKeKeranjang(item.menu)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-2 py-0.5 rounded text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between items-center font-extrabold text-lg text-gray-900">
                  <span>Total:</span>
                  <span className="text-green-700">Rp {totalBelanja.toLocaleString("id-ID")}</span>
                </div>
                <button
                  onClick={() => {
                    alert(`Transaksi Berhasil!\nTotal Belanja: Rp ${totalBelanja.toLocaleString("id-ID")}\nTerima kasih sudah membeli di Joss Gandos!`);
                    setKeranjang([]);
                  }}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg shadow transition-colors mt-2"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}