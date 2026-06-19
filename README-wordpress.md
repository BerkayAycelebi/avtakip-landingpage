# WordPress Göç Rehberi (Av Takip)

Next.js projesinin tüm arayüzü, renk paleti, tipografisi ve dinamik veri yapıları korunarak yerel bir WordPress temasına dönüştürülmüştür. Ayrıca SQLite veritabanındaki blog yazıları ve kategorileri WordPress'e aktaracak XML dosyası üretilmiştir.

---

## 🛠️ Neler Yapıldı?

### 1. WordPress Teması Oluşturuldu (`wp-theme-avtakip`)
Tema klasörü (`c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip`) içinde aşağıdaki dosyalar oluşturuldu:
*   [style.css](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/style.css): WordPress tema başlık bilgilerini içerir.
*   [functions.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/functions.php): 
    *   Outfit yazı tipini ve derlenmiş Tailwind CSS stil dosyasını yükler.
    *   Blog yazıları için özel alanları (`_read_time` okuma süresi ve `_custom_image_url` özel resim linki) yöneten meta kutusunu ekler.
    *   Menü desteğini ve öne çıkarılmış görsel desteğini aktif eder.
    *   WordPress yönetim panelinde **Av Takip Ayarları** adında özel bir yönetim paneli oluşturarak kod düzenlemeden tüm ana sayfa metinlerini, istatistikleri, Play Store linklerini, 6 adet özellik kartını ve checklist öğelerini düzenlemenizi sağlar.
*   [header.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/header.php): Doküman başlığı, meta etiketleri ve Next.js'teki navbar tasarımının (mobil menü desteğiyle birlikte) aynısını içerir.
*   [footer.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/footer.php): Alt bilgi alanı, mobil menü açma/kapama, başlık kaydırma efekti (`.scrolled`) ve Next.js'teki kayma hızıyla aynı olan akıllı smooth scroll mekanizmalarını yönetir.
*   [front-page.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/front-page.php): Landing page (karşılama sayfası) şablonudur. İstatistiklerin ekranda görünürken artarak sayılmasını sağlayan vanilla JS Intersection Observer kodunu barındırır.
*   [home.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/home.php): Blog listeleme sayfası tasarımıdır (`/blog`). Kategoriler, okuma süreleri, tarih etiketleri ve sayfalama desteklenir.
*   [single.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/single.php): Detaylı blog yazısı şablonudur. Yazı içeriğini Tailwind'in `.prose` sınıfıyla formatlar. Sağ sütunda ilgili kategoriden makaleleri listeler ve Google Play tanıtım alanını sunar. Ayrıca tarayıcıyla entegre çalışan mobil uyumlu **Paylaş** butonu içerir.
*   [index.php](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/index.php): Temel WordPress şablon yedeğidir.
*   [screenshot.png](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/screenshot.png): WordPress panelinde görünecek olan özel tasarlanmış tema önizleme görselidir.

### 2. Tailwind CSS Derlendi
*   `@tailwindcss/cli` kullanılarak projedeki tüm PHP ve HTML dosyaları taranmış ve yalnızca kullanılan Tailwind v4 sınıflarını içeren optimize edilmiş `assets/css/main.css` dosyası üretilmiştir (Dosya boyutu: ~62 KB). Dışarıdan ekstra CDN yüklemesi gerektirmez, site çok hızlı açılır.

### 3. SQLite Veritabanı Aktarım Dosyası Oluşturuldu
*   [wordpress-posts.xml](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/wordpress-posts.xml): SQLite veritabanındaki 5 adet kategori ve 5 adet blog yazısı, okuma süreleri, öne çıkarılmış görselleri ve içerikleriyle birlikte WordPress WXR formatına dönüştürülüp tema dizinine kaydedilmiştir.

---

## 🚀 WordPress Kurulum ve Kullanım Adımları

### A. Temanın Yüklenmesi ve Aktif Edilmesi
1.  Oluşturulan `wp-theme-avtakip` klasörünü WordPress sitenizin `wp-content/themes/` dizini altına kopyalayın.
2.  WordPress panelinizden **Görünüm > Temalar (Appearance > Themes)** sayfasına gidin.
3.  **Av Takip** temasını bulun ve **Etkinleştir (Activate)** butonuna tıklayın.

### B. Ana Sayfa Ayarları ve Görünüm Yapılandırması
1.  Temayı aktif ettikten sonra panelin sol menüsüne gelen **Av Takip Ayarları** menüsüne tıklayın.
2.  Açılan formda Hero alanı, Google Play Store linkleri, indirilen/şehir istatistik sayıları, 6 adet özellik kartı (ikon seçimi dahil) ve checklist başlıkları gibi tüm dinamik alanları kontrol edebilirsiniz. İstediğiniz değişiklikleri yapıp **Ayarları Kaydet** demeniz yeterlidir.
3.  **Ayarlar > Okuma (Settings > Reading)** sekmesine gidin.
4.  "Ana sayfa gösteriminiz" ayarında **En son yazılarınız (Your latest posts)** seçeneğinin işaretli olduğundan emin olun. Tema yapısı gereği ana sayfada otomatik olarak `front-page.php` şablonunu, `/blog` adresinde veya blog sayfanızda ise `home.php` şablonunu çalıştıracaktır.

### C. Eski Blog Yazılarının İçe Aktarılması (Migrate)
1.  WordPress yönetim panelinde **Araçlar > İçe Aktar (Tools > Import)** sekmesine gidin.
2.  Listenin en altındaki **WordPress** seçeneğinin altındaki **Hemen Yükle (Install Now)** bağlantısına tıklayarak içe aktarıcıyı kurun, ardından **İçe Aktarıcıyı Çalıştır (Run Importer)** deyin.
3.  Dosya seçiciyi kullanarak `wp-theme-avtakip` klasörü içinde yer alan [wordpress-posts.xml](file:///c:/Users/riza.aycelebi/Desktop/website/wp-theme-avtakip/wordpress-posts.xml) dosyasını seçin ve **Dosya yükle ve içe aktar (Upload file and import)** deyin.
4.  Açılan ekranda yazıları mevcut bir yöneticiye (örn. admin) atayın ve **Submit** deyin.
5.  *Tebrikler!* Tüm kategorileriniz, blog yazılarınız, resimleriniz ve okuma süresi gibi özel parametreleriniz artık WordPress veritabanınızda!
