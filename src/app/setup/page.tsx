"use client";

import Link from "next/link";
import Image from "next/image";

export default function SetupPage() {
  return (
    <div className="container py-5 min-vh-100 d-flex flex-column align-items-center">
      <div className="glass-panel p-5 max-w-800 w-100">
        <div className="text-center mb-5">
          <h1 className="display-4 gradient-text fw-bold mb-3">Jira Bridge Kurulumu</h1>
          <p className="lead text-muted">
            Kurumsal ağ kısıtlamalarını ve WAF engellerini aşmak için bu eklentiyi tarayıcınıza bir kez kurmanız yeterlidir.
          </p>
        </div>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h3 className="h4 mb-4 text-accent">Kurulum Adımları</h3>
            <ol className="list-group list-group-numbered border-0 bg-transparent">
              <li className="list-group-item bg-transparent text-light border-0 px-0 mb-3">
                <strong className="text-white">Eklentiyi İndirin:</strong> Aşağıdaki butona tıklayarak ZIP dosyasını bilgisayarınıza indirin ve bir klasöre çıkartın.
              </li>
              <li className="list-group-item bg-transparent text-light border-0 px-0 mb-3">
                <strong className="text-white">Uzantılar Sayfasını Açın:</strong> Tarayıcınızda (Edge/Chrome) adres satırına <code>edge://extensions</code> veya <code>chrome://extensions</code> yazıp gidin.
              </li>
              <li className="list-group-item bg-transparent text-light border-0 px-0 mb-3">
                <strong className="text-white">Geliştirici Modunu Açın:</strong> Sayfanın sol alt veya sağ üst köşesindeki "Geliştirici modu" anahtarını aktif hale getirin.
              </li>
              <li className="list-group-item bg-transparent text-light border-0 px-0 mb-3">
                <strong className="text-white">Klasörü Yükleyin:</strong> "Paketten açılmış olanı yükle" (Load unpacked) butonuna tıklayın ve ZIP'ten çıkardığınız <code>chrome-extension</code> klasörünü seçin.
              </li>
            </ol>

            <div className="mt-5 d-grid gap-3">
              <a 
                href="/focusonccsi-bridge.zip" 
                className="btn btn-premium btn-lg"
                download
              >
                📥 Jira Bridge ZIP İndir
              </a>
              <Link href="/dashboard" className="btn btn-outline-secondary">
                🏠 Dashboard'a Dön
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden border border-secondary shadow-lg">
              <Image 
                src="/setup-guide.png" 
                alt="Extension Setup Guide" 
                width={800} 
                height={800} 
                layout="responsive"
                className="img-fluid"
              />
            </div>
            <div className="alert alert-info mt-4 bg-opacity-10 border-info border-opacity-25 small">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Not:</strong> Eklentiyi kurduktan sonra Dashboard sayfasını bir kez yenilemeyi unutmayın.
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 text-muted small">
        &copy; 2026 FocusOnCCSI - Powering Waterfall Efficiency
      </footer>
    </div>
  );
}
