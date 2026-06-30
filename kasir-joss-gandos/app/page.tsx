"use client";

import { useState } from "react";

type Menu = {
  nama: string;
  harga: number;
  kategori: "Bakso & Mie" | "Ayam & Nasi" | "Minuman" | "Cemilan & Ekstra"; // Kategori Baru 🏷️
};

type CartItem = Menu & {
  qty: number;
};

type Transaksi = {
  id: string;
  waktu: string;
  tipeOrder: "Dine In" | "Gojek" | "Grab";
  metodeBayar: "Cash" | "GoPay" | "Transfer";
  items: CartItem[];
  total: number;
};

export default function Home() {
  const menu: Menu[] = [
    // --- KATEGORI: BAKSO & MIE ---
    { nama: "Bakso Super Tetelan Joss", harga: 22000, kategori: "Bakso & Mie" },
    { nama: "Mie Ayam Tetelan", harga: 20000, kategori: "Bakso & Mie" },
    { nama: "Mie Ayam", harga: 15000, kategori: "Bakso & Mie" },
    { nama: "Mie Ayam Bakso", harga: 20000, kategori: "Bakso & Mie" },
    { nama: "Mie Ayam Bakso Urat", harga: 22000, kategori: "Bakso & Mie" },
    { nama: "Bakso Urat", harga: 20000, kategori: "Bakso & Mie" },
    { nama: "Bakso Kecil", harga: 15000, kategori: "Bakso & Mie" },
    { nama: "Bakso Telur", status: "Bakso & Mie", harga: 20000, kategori: "Bakso & Mie" },
    
    // --- KATEGORI: AYAM & NASI ---
    { nama: "Ayam Bakar + Nasi", harga: 25000, kategori: "Ayam & Nasi" },
    { nama: "Ayam Goreng Kriuk + Nasi", harga: 25000, kategori: "Ayam & Nasi" },
    { nama: "Ayam Gepuk + Nasi", harga: 27000, kategori: "Ayam & Nasi" },
    { nama: "Nasi Goreng Telur", harga: 20000, kategori: "Ayam & Nasi" },
    { nama: "Mie Goreng Telur", harga: 20000, kategori: "Ayam & Nasi" },
    
    // --- KATEGORI: MINUMAN ---
    { nama: "Cendol Nangka S", harga: 13000, kategori: "Minuman" },
    { nama: "Cendol Nangka M", harga: 16000, kategori: "Minuman" },
    { nama: "Cendol Nangka L", harga: 20000, kategori: "Minuman" },
    { nama: "Cendol Durian S", harga: 18000, kategori: "Minuman" },
    { nama: "Cendol Durian M", harga: 22000, kategori: "Minuman" },
    { nama: "Cendol Durian L", harga: 25000, kategori: "Minuman" },
    { nama: "Es Kelapa Jeruk", harga: 18000, kategori: "Minuman" },
    { nama: "Es Kelapa Gula Aren", harga: 18000, kategori: "Minuman" },
    { nama: "Es Teler Special", harga: 20000, kategori: "Minuman" },
    { nama: "Es Teler Keju", harga: 25000, kategori: "Minuman" },
    { nama: "Air Mineral", harga: 7000, kategori: "Minuman" },
    { nama: "Teh Botol + Es", harga: 7000, kategori: "Minuman" },
    
    // --- KATEGORI: CEMILAN & EKSTRA ---
    { nama: "Tumis Kangkung", harga: 15000, kategori: "Cemilan & Ekstra" },
    { nama: "Tempe Crispy", harga: 12000, kategori: "Cemilan & Ekstra" },
    { nama: "Tahu Bakso", harga: 14000, kategori: "Cemilan & Ekstra" },
    { nama: "Extra Nasi", harga: 6000, kategori: "Cemilan & Ekstra" },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [tipeOrder, setTipeOrder] = useState<"Dine In" | "Gojek" | "Grab">("Dine In");
  const [metodeBayar, setMetodeBayar] = useState<"Cash" | "GoPay" | "Transfer">("Cash");
  
  const [historyTransaksi, setHistoryTransaksi] = useState<Transaksi[]>([]);
  const [showStruk, setShowStruk] = useState<Transaksi | null>(null);
  const [showClosing, setShowClosing] = useState<boolean>(false);

  // 🔍 STATE BARU: Untuk menyimpan input pencarian & filter kategori
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKategori, setSelectedKategori] = useState<string>("Semua");

  // 🔄 FILTER LOGIC: Menyaring menu berdasarkan kata kunci pencarian DAN tombol kategori yang aktif
  const menuTersaring = menu.filter((item) => {
    const cocokSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const cocokKategori = selectedKategori === "Semua" || item.kategori === selectedKategori;
    return cocokSearch && cocokKategori;
  });

  function tambah(item: Menu) {
    const adaDiKeranjang = cart.find((cartItem) => cartItem.nama === item.nama);
    if (adaDiKeranjang) {
      setCart(cart.map((cartItem) => cartItem.nama === item.nama ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  function hapus(namaItem: string) {
    const targetItem = cart.find((item) => item.nama === namaItem);
    if (targetItem && targetItem.qty > 1) {
      setCart(cart.map((item) => item.nama === namaItem ? { ...item, qty: item.qty - 1 } : item));
    } else {
      setCart(cart.filter((item) => item.nama !== namaItem));
    }
  }

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  function handleBayar() {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    const transaksiBaru: Transaksi = {
      id: "TRX-" + Date.now().toString().slice(-6),
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      tipeOrder,
      metodeBayar,
      items: cart,
      total,
    };
    setHistoryTransaksi([...historyTransaksi, transaksiBaru]);
    setShowStruk(transaksiBaru);
    setCart([]);
  }

  const totalPendapatan = historyTransaksi.reduce((sum, t) => sum + t.total, 0);
  const totalDineIn = historyTransaksi.filter((t) => t.tipeOrder === "Dine In").reduce((sum, t) => sum + t.total, 0);
  const totalGojek = historyTransaksi.filter((t) => t.tipeOrder === "Gojek").reduce((sum, t) => sum + t.total, 0);
  const totalGrab = historyTransaksi.filter((t) => t.tipeOrder === "Grab").reduce((sum, t) => sum + t.total, 0);
  const totalCash = historyTransaksi.filter((t) => t.metodeBayar === "Cash").reduce((sum, t) => sum + t.total, 0);
  const totalGoPay = historyTransaksi.filter((t) => t.metodeBayar === "GoPay").reduce((sum, t) => sum + t.total, 0);
  const totalTransfer = historyTransaksi.filter((t) => t.metodeBayar === "Transfer").reduce((sum, t) => sum + t.total, 0);

  const hitungProdukTerjual = () => {
    const rekapProduk: { [key: string]: number } = {};
    historyTransaksi.forEach((t) => {
      t.items.forEach((item) => {
        rekapProduk[item.nama] = (rekapProduk[item.nama] || 0) + item.qty;
      });
    });
    return Object.keys(rekapProduk).map((nama) => ({ nama, jumlah: rekapProduk[nama] })).sort((a, b) => b.jumlah - a.jumlah);
  };

  return (
    <main className="min-h-screen bg-green-900 p-4 md:p-6 print:bg-white print:p-0">
      {/* HEADER UTAMA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">JOSS GANDOZZ POS</h1>
        <button
          onClick={() => setShowClosing(true)}
          className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-green-950 font-bold px-5 py-2.5 rounded-xl shadow-md transition text-sm"
        >
          Rekap Closingan ({historyTransaksi.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL MENU KIRI (DENGAN SEARCH DAN KATEGORI) */}
        <div className="lg:col-span-2 flex flex-col gap-4 print:hidden">
          
          {/* 🔍 1. SEARCH BAR */}
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Cari nama makanan atau minuman disini..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition"
              />
            </div>
          </div>

          {/* 🏷️ 2. FILTER KATEGORI LAYOUT MOKA */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
            {["Semua", "Bakso & Mie", "Ayam & Nasi", "Minuman", "Cemilan & Ekstra"].map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedKategori(kat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition snap-mini ${
                  selectedKategori === kat
                    ? "bg-yellow-500 text-green-950 border-yellow-500 shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {kat === "Semua" ? "📋 Semua Menu" : kat}
              </button>
            ))}
          </div>

          {/* 🍕 3. DAFTAR MENU DINAMIS */}
          {menuTersaring.length === 0 ? (
            <div className="bg-white/10 text-white rounded-xl p-12 text-center border-2 border-dashed border-white/20">
              <p className="text-lg font-medium">Menu tidak ditemukan</p>
              <p className="text-xs text-white/60 mt-1">Coba kata kunci pencarian lain atau pilih kategori berbeda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto pr-1">
              {menuTersaring.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">{item.kategori}</span>
                    <h2 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{item.nama}</h2>
                    <p className="text-green-700 font-extrabold mt-1 text-sm">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() => tambah(item)}
                    className="mt-3 bg-green-700 hover:bg-green-800 text-white font-semibold py-1.5 rounded-lg text-xs transition"
                  >
                    + Tambah
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PANEL KERANJANG KANAN */}
        <div className="bg-white p-5 rounded-xl shadow-md h-fit print:hidden">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Keranjang Kasir</h2>

          <div className="mt-3">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipe Order:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Dine In", "Gojek", "Grab"] as const).map((tipe) => (
                <button
                  key={tipe}
                  onClick={() => setTipeOrder(tipe)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border transition ${tipeOrder === tipe ? "bg-green-700 text-white border-green-700 shadow-sm" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
                >
                  {tipe}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Metode Bayar:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Cash", "GoPay", "Transfer"] as const).map((metode) => (
                <button
                  key={metode}
                  onClick={() => setMetodeBayar(metode)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border transition ${metodeBayar === metode ? "bg-blue-700 text-white border-blue-700 shadow-sm" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
                >
                  {metode}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 max-h-40 overflow-y-auto space-y-2 pr-1 border-t pt-3">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-6 text-xs">Belum ada menu dipilih</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-800 leading-tight">
                      {item.nama} <span className="text-green-700 font-extrabold ml-0.5">x{item.qty}</span>
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Rp {(item.harga * item.qty).toLocaleString("id-ID")}</p>
                  </div>
                  <button
                    onClick={() => hapus(item.nama)}
                    className="text-red-600 hover:text-red-800 font-bold px-2 py-1 bg-red-50 rounded border border-red-100 text-[11px]"
                  >
                    Kurangi
                  </button>
                </div>
              ))
            )}
          </div>

          <hr className="my-4 border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Total Tagihan:</span>
            <span className="text-xl font-black text-gray-950">Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <button
            onClick={handleBayar}
            className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl shadow-md transition text-center text-sm tracking-wide"
          >
            PROSES BAYAR & CETAK
          </button>
        </div>
      </div>

      {/* STRUK MODAL */}
      {showStruk && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 print:static print:bg-transparent print:p-0">
          <div className="bg-white p-5 rounded-xl w-full max-w-sm shadow-xl print:shadow-none print:p-0 font-mono text-gray-800 text-xs">
            <div className="text-center border-b border-dashed pb-2">
              <h3 className="text-base font-bold">WARUNG JOSS GANDOZZ</h3>
              <p className="text-[10px] text-gray-500">Nota Transaksi Kasir</p>
            </div>
            <div className="my-2.5 space-y-0.5 text-[11px] text-gray-600">
              <div className="flex justify-between"><span>No Nota:</span> <span>{showStruk.id}</span></div>
              <div className="flex justify-between"><span>Jam:</span> <span>{showStruk.waktu} WIB</span></div>
              <div className="flex justify-between"><span>Tipe Order:</span> <span className="font-bold">{showStruk.tipeOrder}</span></div>
              <div className="flex justify-between font-bold text-gray-800 border-t pt-0.5 border-gray-100">
                <span>Pembayaran:</span> <span className="underline">{showStruk.metodeBayar}</span>
              </div>
            </div>
            <div className="border-b border-dashed my-2"></div>
            <div className="space-y-1.5 my-2">
              {showStruk.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="max-w-[70%]">{item.nama} <span className="font-bold">x{item.qty}</span></span>
                  <span>{(item.harga * item.qty).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <div className="border-b border-dashed my-2"></div>
            <div className="flex justify-between font-bold text-sm my-2 pt-0.5">
              <span>TOTAL:</span>
              <span>Rp {showStruk.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="mt-4 flex gap-2 print:hidden">
              <button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">Cetak</button>
              <button onClick={() => setShowStruk(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* CLOSINGAN MODAL */}
      {showClosing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white p-5 rounded-xl w-full max-w-md shadow-xl text-gray-800 max-h-[90vh] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3 flex-shrink-0">Rekap Data Closingan Toko</h3>
            <div className="space-y-3 overflow-y-auto pr-1 flex-1 text-xs">
              <div className="flex justify-between bg-gray-50 p-2.5 rounded-lg border">
                <span className="font-medium text-gray-600">Total Transaksi Selesai:</span>
                <span className="font-bold text-gray-900">{historyTransaksi.length} Pesanan</span>
              </div>
              <div className="p-2.5 bg-green-50 border border-green-100 rounded-lg space-y-1 text-green-900">
                <div className="font-bold text-green-950 mb-0.5">Rincian Sumber Pesanan:</div>
                <div className="flex justify-between"><span>Dine In:</span><span className="font-semibold">Rp {totalDineIn.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Gojek:</span><span className="font-semibold">Rp {totalGojek.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Grab:</span><span className="font-semibold">Rp {totalGrab.toLocaleString("id-ID")}</span></div>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg space-y-1 text-blue-900">
                <div className="font-bold text-blue-950 mb-0.5">Rincian Aliran Uang Masuk:</div>
                <div className="flex justify-between"><span>Total Uang Cash (Laci):</span><span className="font-semibold text-gray-900">Rp {totalCash.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Total Masuk GoPay:</span><span className="font-semibold text-gray-900">Rp {totalGoPay.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Total Masuk Transfer:</span><span className="font-semibold text-gray-900">Rp {totalTransfer.toLocaleString("id-ID")}</span></div>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg flex justify-between font-bold text-sm text-amber-950">
                <span>TOTAL OMSET KESELURUHAN:</span>
                <span>Rp {totalPendapatan.toLocaleString("id-ID")}</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-1.5">Detail Produk Terjual:</h4>
                {hitungProdukTerjual().length === 0 ? (
                  <p className="italic bg-gray-50 p-2 rounded-lg border text-center text-gray-400">Belum ada item terjual hari ini.</p>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-100 font-bold p-2 text-gray-700 border-b">
                      <span className="col-span-2">Nama Menu</span>
                      <span className="text-right">Terjual</span>
                    </div>
                    <div className="divide-y max-h-28 overflow-y-auto">
                      {hitungProdukTerjual().map((item, idx) => (
                        <div key={idx} className="grid grid-cols-3 p-2 bg-white">
                          <span className="col-span-2 font-medium text-gray-800">{item.nama}</span>
                          <span className="text-right font-bold text-green-700">{item.jumlah} porsi</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2 pt-2 border-t flex-shrink-0">
              <button onClick={() => confirm("Reset data hari ini?") && setHistoryTransaksi([])} className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-lg text-xs transition">Reset Hari Baru</button>
              <button onClick={() => setShowClosing(false)} className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-lg text-xs transition text-center">Kembali</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}