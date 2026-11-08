'use client';

import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-start">
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-md border border-gray-300">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/profile.jpg"
                alt="รูปโปรไฟล์ กฤษณะ ฮุสเซ็น"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-lg leading-8 text-gray-900 sm:text-xl">
            <h1 className="mb-4 text-3xl font-bold text-gray-950">แนะนำตัว</h1>
            <p><strong>ชื่อ:</strong> กฤษณะ ฮุสเซ็น</p>
            <p><strong>อายุ:</strong> 21 ปี</p>
            <p><strong>เลขประจำตัวนักศึกษา:</strong> 68052228</p>
            <p><strong>มหาวิทยาลัย:</strong> มหาวิทยาลัยศรีปทุม</p>
            <p><strong>สาขา:</strong> วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
            <p><strong>วิชา:</strong> CSI 205</p>
            <p><strong>สายงานที่ต้องการ:</strong> Software Developer / Programmer / Software Engineer</p>
          </div>
        </div>
      </section>
    </main>
  );
}
