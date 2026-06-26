"use client";

import { useState } from "react";

type Menu = {
  nama: string;
  harga: number;
};

// 🛒 TIPE DATA BARU: Keranjang sekarang punya qty (jumlah porsi)
type CartItem = Menu & {
  qty: number;
};

type Transaksi = {
  id: string;
  waktu: string;
  tipeOrder: "Dine In" | "Gojek" | "Grab";
  metodeBayar: "Cash" | "GoPay" | "Transfer";
  items: CartItem[]; // Menyimpan data barang beserta jumlahnya saat closing/struk
  total: number;
};

export default function Home() {
  const menu: Menu[] = [
    { nama: "Bakso Super Tetelan Joss", harga: 22000 },
    { nama: "Ayam Bakar + Nasi", harga: 25000 },
    { nama: "Ayam Goreng Kriuk + Nasi", harga: 25000 },
    { nama: "Ayam Gepuk + Nasi", harga: 27000 },
    { nama: "Mie Ayam Tetelan", harga: 20000 },
    { nama: "Mie Ayam", harga: 15000 },
    { nama: "Mie Ayam Bakso", harga: 20000 },
    { nama: "Mie Ayam Bakso Urat", harga: 22000 },
    { nama: "Bakso Urat", harga: 20000 },
    { nama: "Bakso Kecil", harga: 15000 },
    { nama: "Bakso Telur", harga: 20000 },
    { nama: "Tumis Kangkung", harga: 15000 },
    { nama: "Nasi Goreng Telur", harga: 20000 },
    { nama: "Mie Goreng Telur", harga: 20000 },
    { nama: "Tempe Crispy", harga: 12000 },
    { nama: "Tahu Bakso", harga: 14000 },
    { nama: "Extra Nasi", harga: 6000 },
    { nama: "Cendol Nangka S", harga: 13000 },
    { nama: "Cendol Nangka M", harga: 16000 },
    { nama: "Cendol Nangka L", harga: 20000 },
    { nama: "Cendol Durian S", harga: 18000 },
    { nama: "Cendol Durian M", harga: 22000 },
    { nama: "Cendol Durian L", harga: 25000 },
    { nama: "Es Kelapa Jeruk", harga: 18000 },
    { nama: "Es Kelapa Gula Aren", harga: 18000 },
    { nama: "Es Teler Special", harga: 20000 },
    { nama: "Es Teler Keju", harga: 25000 },
    { nama: "Air Mineral", harga: 7000 },
    { nama: "Teh Botol + Es", harga: 7000 },
  ];

  // Menggunakan CartItem[] agar mendukung penggabungan kuantitas
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tipeOrder, setTipeOrder] = useState<"Dine In" | "Gojek" | "Grab">("Dine In");
  const [metodeBayar, setMetodeBayar] = useState<"Cash" | "GoPay" | "Transfer">("Cash");
  
  const [historyTransaksi, setHistoryTransaksi] = useState<Transaksi[]>([]);
  const [showStruk, setShowStruk] = useState<Transaksi | null>(null);
  const [showClosing, setShowClosing] = useState<boolean>(false);

  // 🔄 FUNGSI TAMBAH YANG DIPERBARUI: Cek dulu apakah barang sudah ada di keranjang
  function tambah(item: Menu) {
    const adaDiKeranjang = cart.find((cartItem) => cartItem.nama === item.nama);

    if (adaDiKeranjang) {
      // Jika sudah ada, naikkan jumlah kuantitasnya (+1)
      setCart(
        cart.map((cartItem) =>
          cartItem.nama === item.nama
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        )
      );
    } else {
      // Jika belum ada, masukkan sebagai item baru dengan qty: 1
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  // 🔄 FUNGSI HAPUS YANG DIPERBARUI: Mengurangi qty atau menghapus total jika tinggal 1
  function hapus(namaItem: string) {
    const targetItem = cart.find((item) => item.nama === namaItem);

    if (targetItem && targetItem.qty > 1) {
      // Jika jumlahnya lebih dari 1, kurangi 1 porsi saja
      setCart(
        cart.map((item) =>
          item.nama === namaItem ? { ...item, qty: item.qty - 1 } : item
        )
      );
    } else {
      // Jika porsinya sisa 1, hapus permanen dari keranjang
      setCart(cart.filter((item) => item.nama !== namaItem));
    }
  }

  // Menghitung total harga berdasarkan harga satuan dikali jumlah porsi (qty)
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  function handleBayar() {
    if (cart.length === 0) return alert("Keranjang masih kosong!");

    const transaksiBaru: Transaksi = {
      id: "TRX-" + Date.now().toString().slice(-6),
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      tipeOrder: tipeOrder,
      metodeBayar: metodeBayar,
      items: cart,
      total: total,
    };

    setHistoryTransaksi([...historyTransaksi, transaksiBaru]);
    setShowStruk(transaksiBaru);
    setCart([]);
  }

  function handlePrint() {
    window.print();
  }

  // --- LOGIKA KALKULASI CLOSINGAN ---
  const totalPendapatan = historyTransaksi.reduce((sum, t) => sum + t.total, 0);
  
  const totalDineIn = historyTransaksi.filter((t) => t.tipeOrder === "Dine In").reduce((sum, t) => sum + t.total, 0);
  const totalGojek = historyTransaksi.filter((t) => t.tipeOrder === "Gojek").reduce((sum, t) => sum + t.total, 0);
  const totalGrab = historyTransaksi.filter((t) => t.tipeOrder === "Grab").reduce((sum, t) => sum + t.total, 0);

  const totalCash = historyTransaksi.filter((t) => t.metodeBayar === "Cash").reduce((sum, t) => sum + t.total, 0);
  const totalGoPay = historyTransaksi.filter((t) => t.metodeBayar === "GoPay").reduce((sum, t) => sum + t.total, 0);
  const totalTransfer = historyTransaksi.filter((t) => t.metodeBayar === "Transfer").reduce((sum, t) => sum + t.total, 0);

  // Menghitung total produk terjual dari data akumulasi qty
  const hitungProdukTerjual = () => {
    const rekapProduk: { [key: string]: number } = {};
    historyTransaksi.forEach((transaksi) => {
      transaksi.items.forEach((item) => {
        if (rekapProduk[item.nama]) {
          rekapProduk[item.nama] += item.qty; // Tambahkan berdasarkan jumlah qty transaksi
        } else {
          rekapProduk[item.nama] = item.qty;
        }
      });
    });
    return Object.keys(rekapProduk)
      .map((nama) => ({ nama, jumlah: rekapProduk[nama] }))
      .sort((a, b) => b.jumlah - a.jumlah);
  };

  const daftarProdukTerjual = hitungProdukTerjual();

  return (
    <main className="min-h-screen bg-green-900 p-6 print:bg-white print:p-0">
      {/* HEADER UTAMA */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-4xl font-bold text-white">JOSS GANDOZZ POS</h1>
        <button
          onClick={() => setShowClosing(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-green-950 font-bold px-5 py-2.5 rounded-lg shadow-md transition"
        >
          Rekap Closingan ({historyTransaksi.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BAGIAN DAFTAR MENU */}
        <div className="lg:col-span-2 print:hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menu.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{item.nama}</h2>
                  <p className="text-green-700 font-semibold mt-1 text-sm">
                    Rp {item.harga.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => tambah(item)}
                  className="mt-3 bg-green-700 hover:bg-green-800 text-white font-medium py-1.5 rounded-lg text-sm transition"
                >
                  + Tambah
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN KASIR / KERANJANG */}
        <div className="bg-white p-5 rounded-xl shadow-md h-fit print:hidden">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Keranjang Kasir</h2>

          {/* PILIHAN TIPE ORDERAN */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipe Order:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Dine In", "Gojek", "Grab"] as const).map((tipe) => (
                <button
                  key={tipe}
                  type="button"
                  onClick={() => setTipeOrder(tipe)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border transition ${
                    tipeOrder === tipe
                      ? "bg-green-700 text-white border-green-700 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tipe}
                </button>
              ))}
            </div>
          </div>

          {/* PILIHAN METODE PEMBAYARAN */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Metode Bayar:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Cash", "GoPay", "Transfer"] as const).map((metode) => (
                <button
                  key={metode}
                  type="button"
                  onClick={() => setMetodeBayar(metode)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border transition ${
                    metodeBayar === metode
                      ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {metode}
                </button>
              ))}
            </div>
          </div>

          {/* DAFTAR ITEM DI KERANJANG */}
          <div className="mt-5 max-h-48 overflow-y-auto space-y-2.5 pr-1 border-t pt-3">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-6 text-sm">Belum ada menu yang dipilih</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div>
                    {/* TAMPILAN BARU: Menampilkan Perkalian x2, x3, dst */}
                    <p className="font-medium text-gray-800 leading-tight">
                      {item.nama} <span className="text-green-700 font-bold ml-1">x{item.qty}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Rp {(item.harga * item.qty).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() => hapus(item.nama)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 rounded border border-red-100"
                  >
                    Kurangi
                  </button>
                </div>
              ))
            )}
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Tagihan:</span>
            <span className="text-2xl font-black text-gray-950">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleBayar}
            className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-md transition text-center tracking-wide"
          >
            PROSES BAYAR & CETAK
          </button>
        </div>
      </div>

      {/* POPUP MODAL 1: STRUK NOTA BELANJA */}
      {showStruk && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 print:static print:bg-transparent print:p-0">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl print:shadow-none print:p-0 font-mono text-gray-800 text-sm">
            <div className="text-center border-b border-dashed pb-3">
              <h3 className="text-lg font-bold">WARUNG JOSS GANDOZZ</h3>
              <p className="text-xs text-gray-500">Nota Transaksi Kasir</p>
            </div>
            <div className="my-3 space-y-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>No Nota:</span> <span>{showStruk.id}</span></div>
              <div className="flex justify-between"><span>Jam:</span> <span>{showStruk.waktu} WIB</span></div>
              <div className="flex justify-between"><span>Tipe Order:</span> <span className="font-bold">{showStruk.tipeOrder}</span></div>
              <div className="flex justify-between font-bold text-gray-800 border-t pt-1 border-gray-100">
                <span>Pembayaran:</span> <span className="underline">{showStruk.metodeBayar}</span>
              </div>
            </div>
            <div className="border-b border-dashed my-2"></div>
            <div className="space-y-2 my-3 max-h-48 overflow-y-auto print:max-h-none">
              {showStruk.items.map((item, index) => (
                <div key={index} className="flex justify-between text-xs">
                  {/* TAMPILAN STRUK BARU: Menyertakan jumlah xQty */}
                  <span className="max-w-[70%]">{item.nama} <span className="font-bold">x{item.qty}</span></span>
                  <span>{(item.harga * item.qty).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <div className="border-b border-dashed my-2"></div>
            <div className="flex justify-between font-bold text-base my-3 pt-1">
              <span>TOTAL:</span>
              <span>Rp {showStruk.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="mt-5 flex gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
              >
                Cetak Struk
              </button>
              <button
                onClick={() => setShowStruk(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL 2: CLOSINGAN HARIAN */}
      {showClosing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-gray-800 max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4 flex-shrink-0">
              Rekap Data Closingan Toko
            </h3>
            
            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              <div className="flex justify-between bg-gray-50 p-3 rounded-lg border text-sm">
                <span className="font-medium text-gray-600">Total Transaksi Selesai:</span>
                <span className="font-bold text-gray-900">{historyTransaksi.length} Pesanan</span>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-1.5 text-xs text-green-900">
                <div className="font-bold text-sm text-green-950 mb-1">Rincian Sumber Pesanan:</div>
                <div className="flex justify-between"><span>Dine In:</span><span className="font-semibold">Rp {totalDineIn.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Gojek:</span><span className="font-semibold">Rp {totalGojek.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Grab:</span><span className="font-semibold">Rp {totalGrab.toLocaleString("id-ID")}</span></div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1.5 text-xs text-blue-900">
                <div className="font-bold text-sm text-blue-950 mb-1">Rincian Aliran Uang Masuk:</div>
                <div className="flex justify-between"><span>Total Uang Cash (Laci):</span><span className="font-semibold text-gray-900">Rp {totalCash.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Total Masuk GoPay:</span><span className="font-semibold text-gray-900">Rp {totalGoPay.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span>Total Masuk Transfer (TF):</span><span className="font-semibold text-gray-900">Rp {totalTransfer.toLocaleString("id-ID")}</span></div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex justify-between font-bold text-base text-amber-950">
                <span>TOTAL OMSET KESELURUHAN:</span>
                <span>Rp {totalPendapatan.toLocaleString("id-ID")}</span>
              </div>

              {/* Detail Produk Terjual */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Detail Produk Terjual:</h4>
                {daftarProdukTerjual.length === 0 ? (
                  <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg border text-center">
                    Belum ada item terjual hari ini.
                  </p>
                ) : (
                  <div className="border rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-3 bg-gray-100 font-bold p-2 text-gray-700 border-b">
                      <span className="col-span-2">Nama Menu</span>
                      <span className="text-right">Terjual</span>
                    </div>
                    <div className="divide-y max-h-36 overflow-y-auto">
                      {daftarProdukTerjual.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 p-2 bg-white">
                          <span className="col-span-2 font-medium text-gray-800">{item.nama}</span>
                          <span className="text-right font-bold text-green-700">{item.jumlah} porsi</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-5 flex gap-2 pt-3 border-t flex-shrink-0">
              <button
                onClick={() => {
                  if(confirm("Apakah kamu yakin ingin mereset semua data transaksi hari ini?")) {
                    setHistoryTransaksi([]);
                    setShowClosing(false);
                  }
                }}
                className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-lg text-xs transition"
              >
                Reset Hari Baru
              </button>
              <button
                onClick={() => setShowClosing(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-lg text-xs transition text-center"
              >
                Kembali ke Kasir
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}