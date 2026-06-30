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
    { nama: "Tahu Bakso", fontColor: "black", harga: 14000, kategori: "Makanan" },
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* HEADER BAR DENGAN WARNA HIJAU JOSS GANDOS */}
      <header className="bg-gradient-to-r from-emerald-800 to-green-700 py-6 px-4 text-center shadow-md mb-6 rounded-b-2xl">
        <h1 className="text-3xl font-black text-white tracking-wider drop-shadow-sm">JOSS GANDOS</h1>
        <p className="text-xs text-emerald-100 font-medium tracking-wide mt-1 uppercase">Spesialis Sambal Ijo — Aplikasi Kasir Moka</p>
      </header>

      <div className="p-4 max-w-5xl mx-auto">
        {/* SEARCH BAR & KATEGORI */}
        <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari menu makanan atau minuman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriTerpilih(kat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                  kategoriTerpilih === kat
                    ? "bg-emerald-700 text-white shadow-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DAFTAR MENU */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-extrabold text-gray-700 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-600 rounded-full block"></span>
              Menu Tersedia
            </h2>
            
            {menuTersaring.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 italic text-sm">Menu tidak ditemukan, coba cari yang lain...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuTersaring.map((menu) => (
                  <div
                    key={menu.nama}
                    onClick={() => tambahKeKeranjang(menu)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between group active:scale-[0.98]"
                  >
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide mb-2 ${
                        menu.kategori === 'Makanan' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {menu.kategori}
                      </span>
                      <h3 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors leading-tight">{menu.nama}</h3>
                    </div>
                    <p className="text-emerald-600 font-extrabold mt-3 text-right text-sm bg-emerald-50/50 px-3 py-1 rounded-lg w-fit ml-auto">
                      Rp {menu.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STRUK / KERANJANG */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 h-fit sticky top-4">
            <h2 className="text-lg font-extrabold text-gray-800 border-b pb-3 mb-4 border-gray-100 text-center tracking-wide">
              Struk Belanja
            </h2>
            
            {keranjang.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-300 text-sm italic">Belum ada item dipilih</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                  {keranjang.map((item) => (
                    <div key={item.menu.nama} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2">
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-gray-800 leading-tight">{item.menu.nama}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {item.jumlah} x Rp {item.menu.harga.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 ml-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                        <button
                          onClick={() => kurangiDariKeranjang(item.menu.nama)}
                          className="bg-white hover:bg-red-50 hover:text-red-600 text-gray-500 font-bold w-5 h-5 rounded-md flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-gray-700 min-w-[16px] text-center">{item.jumlah}</span>
                        <button
                          onClick={() => tambahKeKeranjang(item.menu)}
                          className="bg-white hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 font-bold w-5 h-5 rounded-md flex items-center justify-center transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <div className="flex justify-between items-center font-black text-base text-gray-800">
                    <span>Total:</span>
                    <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">Rp {totalBelanja.toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Transaksi Berhasil!\nTotal Belanja: Rp ${totalBelanja.toLocaleString("id-ID")}\nTerima kasih sudah membeli di Joss Gandos!`);
                      setKeranjang([]);
                    }}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-100 transition-all text-sm uppercase tracking-wider active:scale-[0.99]"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}