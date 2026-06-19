<?php
/**
 * Av Takip Theme Functions and Definitions
 */

if ( ! function_exists( 'avtakip_setup' ) ) {
    function avtakip_setup() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // Switch default core markup for search form, comment form, etc. to output valid HTML5.
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );

        // Register Menus
        register_nav_menus( array(
            'header-menu' => esc_html__( 'Header Menu', 'avtakip' ),
            'footer-menu' => esc_html__( 'Footer Menu', 'avtakip' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'avtakip_setup' );

/**
 * Enqueue scripts and styles.
 */
function avtakip_scripts() {
    // Google Font: Outfit
    wp_enqueue_style( 'google-font-outfit', 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap', array(), null );

    // Main Stylesheet (Tailwind Compiled)
    wp_enqueue_style( 'avtakip-style', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'avtakip_scripts' );

/**
 * Read Time and Custom Image Meta Box for Blog Posts
 */
function avtakip_add_custom_meta_boxes() {
    add_meta_box(
        'avtakip_post_details',
        'Av Takip Yazı Detayları',
        'avtakip_render_post_details_meta_box',
        'post',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'avtakip_add_custom_meta_boxes' );

function avtakip_render_post_details_meta_box( $post ) {
    wp_nonce_field( 'avtakip_save_post_details', 'avtakip_post_details_nonce' );

    $read_time = get_post_meta( $post->ID, '_read_time', true );
    $custom_image = get_post_meta( $post->ID, '_custom_image_url', true );

    echo '<p>';
    echo '<label for="avtakip_read_time">Okuma Süresi (örn. 5 dk):</label><br>';
    echo '<input type="text" id="avtakip_read_time" name="avtakip_read_time" value="' . esc_attr( $read_time ) . '" class="widefat">';
    echo '</p>';

    echo '<p>';
    echo '<label for="avtakip_custom_image_url">Özel Resim URL\'si (Alternatif):</label><br>';
    echo '<input type="text" id="avtakip_custom_image_url" name="avtakip_custom_image_url" value="' . esc_attr( $custom_image ) . '" class="widefat">';
    echo '</p>';
}

function avtakip_save_post_details( $post_id ) {
    if ( ! isset( $_POST['avtakip_post_details_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['avtakip_post_details_nonce'], 'avtakip_save_post_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['avtakip_read_time'] ) ) {
        update_post_meta( $post_id, '_read_time', sanitize_text_field( $_POST['avtakip_read_time'] ) );
    }
    if ( isset( $_POST['avtakip_custom_image_url'] ) ) {
        update_post_meta( $post_id, '_custom_image_url', esc_url_raw( $_POST['avtakip_custom_image_url'] ) );
    }
}
add_action( 'save_post', 'avtakip_save_post_details' );

/**
 * ── Theme Settings Page (Av Takip Ayarları) ──
 */
function avtakip_add_admin_menu() {
    add_menu_page(
        'Av Takip Ayarları',
        'Av Takip Ayarları',
        'manage_options',
        'avtakip-settings',
        'avtakip_render_settings_page',
        'dashicons-admin-generic',
        60
    );
}
add_action( 'admin_menu', 'avtakip_add_admin_menu' );

// Default settings definitions
function avtakip_get_default_settings() {
    return [
        'hero_badge' => 'Android için saha takip uygulaması',
        'hero_title' => 'Av Takip',
        'hero_subtitle' => 'Avlak noktaları, solunar takvim, canlı harita, hava durumu ve ekip iletişimi. Doğaya çıkmadan önce planla, sahadayken kontrolü elinde tut.',
        'hero_cta_primary' => "Google Play'den indir",
        'hero_cta_secondary' => 'Özellikleri incele',
        'play_store_url' => 'https://play.google.com/store/apps/details?id=com.berkayaycelebi.avtakip',
        'downloads' => '1.000+',
        'rating' => '4.8',
        'total_reviews' => '52',
        'city_count' => '81',
        'satisfaction' => '98',
        'app_logo_url' => '',
        'app_mockup_url' => '',
        'app_features_url' => '',
        'features_label' => 'Tek Uygulama',
        'features_title' => 'Av gününü planlamak için gereken temel araçlar.',
        'features' => [
            ['title' => 'Solunar Takvim', 'description' => 'Ay evreleri, gün doğumu ve gün batımı verileriyle av için doğru saatleri tek bakışta görün.', 'icon' => 'CalendarDays'],
            ['title' => 'Canlı Harita', 'description' => 'Avlak noktalarını kaydedin, rota oluşturun ve ekibinizin konumunu sahada takip edin.', 'icon' => 'MapPin'],
            ['title' => 'Bas-Konuş Telsiz', 'description' => 'Ekip arkadaşlarınızla telefondan hızlı sesli iletişim kurun, koordinasyonu koparmayın.', 'icon' => 'Radio'],
            ['title' => 'Hava ve Basınç', 'description' => 'Rüzgar, sıcaklık, basınç ve hava durumu bilgilerini karar anında yanınızda taşıyın.', 'icon' => 'CloudSun'],
            ['title' => 'Ekip Yönetimi', 'description' => 'Davet bağlantısı, ekip listesi ve skor görünümüyle av grubunuzu düzenli tutun.', 'icon' => 'Users'],
            ['title' => 'Gizlilik Kontrolü', 'description' => 'Konum ve profil verilerinizi sadece seçtiğiniz ekiple paylaşmaya odaklanan güvenli yapı.', 'icon' => 'ShieldCheck'],
        ],
        'screens_label' => 'Gerçek Ekranlar',
        'screens_title' => 'Harita, takvim ve ekip akışı aynı yerde.',
        'screens_desc' => 'Av Takip; saha notlarını, konum bilgisini, hava tahminini ve ekip iletişimini ayrı ayrı aramak yerine düzenli bir mobil deneyimde toplar.',
        'screens_checklist' => [
            'Avlak, rota ve not kayıtları',
            'Türkiye geneli il desteği',
            'Mobil öncelikli hızlı kullanım',
            'Av ve balıkçılık için tek panel'
        ],
        'cta_title' => 'Bir sonraki av gününü daha planlı başlat.',
        'cta_desc' => 'Ücretsiz indir, ekibini kur, favori noktalarını kaydet ve sahada hızlı karar al.',
        'cta_btn_text' => 'Hemen indir',
        'cta_satisfaction_label' => 'Kullanıcı',
        'cta_satisfaction_desc' => 'Memnuniyet odağıyla geliştirilen sade, hızlı ve mobil bir saha deneyimi.'
    ];
}

// Get setting with fallback
function avtakip_get_setting( $key, $default_value = '' ) {
    $settings = get_option( 'avtakip_homepage_settings', array() );
    $defaults = avtakip_get_default_settings();
    
    if ( isset( $settings[$key] ) ) {
        return $settings[$key];
    }
    
    return isset( $defaults[$key] ) ? $defaults[$key] : $default_value;
}

// Render settings form
function avtakip_render_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    if ( isset( $_POST['avtakip_save_settings'] ) && check_admin_referer( 'avtakip_settings_verify' ) ) {
        $settings = array();
        $fields = [
            'hero_badge', 'hero_title', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary',
            'play_store_url', 'downloads', 'rating', 'total_reviews', 'city_count', 'satisfaction',
            'app_logo_url', 'app_mockup_url', 'app_features_url',
            'features_label', 'features_title',
            'screens_label', 'screens_title', 'screens_desc',
            'cta_title', 'cta_desc', 'cta_btn_text', 'cta_satisfaction_label', 'cta_satisfaction_desc'
        ];

        foreach ( $fields as $field ) {
            if ( isset( $_POST[$field] ) ) {
                $settings[$field] = sanitize_text_field( stripslashes($_POST[$field]) );
            }
        }

        // Features Array
        $features = array();
        for ( $i = 0; $i < 6; $i++ ) {
            $features[] = [
                'title' => sanitize_text_field( stripslashes($_POST['feature_title_' . $i]) ),
                'description' => sanitize_text_field( stripslashes($_POST['feature_desc_' . $i]) ),
                'icon' => sanitize_text_field( $_POST['feature_icon_' . $i] )
            ];
        }
        $settings['features'] = $features;

        // Screens Checklist Array
        $checklist = array();
        for ( $i = 0; $i < 4; $i++ ) {
            if ( isset( $_POST['checklist_item_' . $i] ) ) {
                $checklist[] = sanitize_text_field( stripslashes($_POST['checklist_item_' . $i]) );
            }
        }
        $settings['screens_checklist'] = $checklist;

        update_option( 'avtakip_homepage_settings', $settings );
        echo '<div class="updated"><p>Ayarlar başarıyla kaydedildi.</p></div>';
    }

    $defaults = avtakip_get_default_settings();
    ?>
    <div class="wrap" style="background:#fff; padding:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); max-width:800px; margin-top:20px;">
        <h1 style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px; font-weight:600; color:#1d2327;">Av Takip Uygulama Ayarları</h1>
        
        <form method="post" action="">
            <?php wp_nonce_field( 'avtakip_settings_verify' ); ?>
            
            <h2>Hero (Karşılama) Alanı</h2>
            <table class="form-table">
                <tr>
                    <th>Hero Rozeti (Badge)</th>
                    <td><input type="text" name="hero_badge" value="<?php echo esc_attr( avtakip_get_setting('hero_badge') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Hero Başlığı</th>
                    <td><input type="text" name="hero_title" value="<?php echo esc_attr( avtakip_get_setting('hero_title') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Hero Alt Başlığı (Açıklama)</th>
                    <td><textarea name="hero_subtitle" rows="3" class="large-text"><?php echo esc_textarea( avtakip_get_setting('hero_subtitle') ); ?></textarea></td>
                </tr>
                <tr>
                    <th>Google Play Store Linki</th>
                    <td><input type="url" name="play_store_url" value="<?php echo esc_url( avtakip_get_setting('play_store_url') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Birincil Buton Metni (CTA)</th>
                    <td><input type="text" name="hero_cta_primary" value="<?php echo esc_attr( avtakip_get_setting('hero_cta_primary') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>İkincil Buton Metni (Özellikler)</th>
                    <td><input type="text" name="hero_cta_secondary" value="<?php echo esc_attr( avtakip_get_setting('hero_cta_secondary') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Uygulama Logo URL</th>
                    <td><input type="text" name="app_logo_url" value="<?php echo esc_attr( avtakip_get_setting('app_logo_url') ); ?>" class="regular-text" placeholder="Boş bırakılırsa tema varsayılan logosu kullanılır."></td>
                </tr>
                <tr>
                    <th>Uygulama Mockup URL</th>
                    <td><input type="text" name="app_mockup_url" value="<?php echo esc_attr( avtakip_get_setting('app_mockup_url') ); ?>" class="regular-text" placeholder="Boş bırakılırsa tema varsayılan görseli kullanılır."></td>
                </tr>
                <tr>
                    <th>Özellik Ekranları Mockup URL</th>
                    <td><input type="text" name="app_features_url" value="<?php echo esc_attr( avtakip_get_setting('app_features_url') ); ?>" class="regular-text" placeholder="Boş bırakılırsa tema varsayılan ekran görseli kullanılır."></td>
                </tr>
            </table>

            <hr style="border:none; border-bottom:1px solid #eee; margin:30px 0;">

            <h2>Uygulama İstatistikleri (Stats)</h2>
            <table class="form-table">
                <tr>
                    <th>İndirme Sayısı (örn. 1.000+)</th>
                    <td><input type="text" name="downloads" value="<?php echo esc_attr( avtakip_get_setting('downloads') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Puan (örn. 4.8)</th>
                    <td><input type="text" name="rating" value="<?php echo esc_attr( avtakip_get_setting('rating') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Değerlendirme Sayısı (örn. 52)</th>
                    <td><input type="number" name="total_reviews" value="<?php echo esc_attr( avtakip_get_setting('total_reviews') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Desteklenen Şehir Sayısı (örn. 81)</th>
                    <td><input type="number" name="city_count" value="<?php echo esc_attr( avtakip_get_setting('city_count') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Memnuniyet Oranı (Yüzde - örn. 98)</th>
                    <td><input type="number" name="satisfaction" value="<?php echo esc_attr( avtakip_get_setting('satisfaction') ); ?>" class="regular-text"></td>
                </tr>
            </table>

            <hr style="border:none; border-bottom:1px solid #eee; margin:30px 0;">

            <h2>Özellikler Bölümü (6 Kart)</h2>
            <table class="form-table">
                <tr>
                    <th>Özellikler Bölüm Etiketi</th>
                    <td><input type="text" name="features_label" value="<?php echo esc_attr( avtakip_get_setting('features_label') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Özellikler Başlığı</th>
                    <td><input type="text" name="features_title" value="<?php echo esc_attr( avtakip_get_setting('features_title') ); ?>" class="large-text"></td>
                </tr>
            </table>

            <?php
            $features = avtakip_get_setting('features', []);
            $icons = ['CalendarDays', 'MapPin', 'Radio', 'CloudSun', 'Users', 'ShieldCheck', 'Compass', 'Star', 'Download', 'Check'];
            for ( $i = 0; $i < 6; $i++ ) {
                $feat = isset($features[$i]) ? $features[$i] : ['title' => '', 'description' => '', 'icon' => 'Star'];
                ?>
                <div style="background:#f9f9f9; padding:15px; border:1px solid #e5e5e5; border-radius:6px; margin-bottom:15px;">
                    <h3 style="margin-top:0; border-bottom:1px dashed #ddd; padding-bottom:8px;">Özellik <?php echo ($i+1); ?></h3>
                    <table class="form-table" style="margin-top:0;">
                        <tr>
                            <th style="width:150px; padding:8px 0;">Başlık</th>
                            <td style="padding:8px 0;"><input type="text" name="feature_title_<?php echo $i; ?>" value="<?php echo esc_attr($feat['title']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th style="width:150px; padding:8px 0;">Açıklama</th>
                            <td style="padding:8px 0;"><textarea name="feature_desc_<?php echo $i; ?>" rows="2" class="large-text"><?php echo esc_textarea($feat['description']); ?></textarea></td>
                        </tr>
                        <tr>
                            <th style="width:150px; padding:8px 0;">İkon</th>
                            <td style="padding:8px 0;">
                                <select name="feature_icon_<?php echo $i; ?>">
                                    <?php foreach ( $icons as $ic ) : ?>
                                        <option value="<?php echo $ic; ?>" <?php selected($feat['icon'], $ic); ?>><?php echo $ic; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
            <?php } ?>

            <hr style="border:none; border-bottom:1px solid #eee; margin:30px 0;">

            <h2>Ekranlar Bölümü (Checklist)</h2>
            <table class="form-table">
                <tr>
                    <th>Bölüm Etiketi</th>
                    <td><input type="text" name="screens_label" value="<?php echo esc_attr( avtakip_get_setting('screens_label') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Bölüm Başlığı</th>
                    <td><input type="text" name="screens_title" value="<?php echo esc_attr( avtakip_get_setting('screens_title') ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th>Bölüm Açıklaması</th>
                    <td><textarea name="screens_desc" rows="3" class="large-text"><?php echo esc_textarea( avtakip_get_setting('screens_desc') ); ?></textarea></td>
                </tr>
            </table>

            <div style="background:#f9f9f9; padding:15px; border:1px solid #e5e5e5; border-radius:6px;">
                <h3 style="margin-top:0;">Checklist Elemanları (4 Adet)</h3>
                <?php
                $checklist = avtakip_get_setting('screens_checklist', []);
                for ($i = 0; $i < 4; $i++) {
                    $val = isset($checklist[$i]) ? $checklist[$i] : '';
                    ?>
                    <div style="margin-bottom:8px;">
                        <input type="text" name="checklist_item_<?php echo $i; ?>" value="<?php echo esc_attr($val); ?>" class="large-text" placeholder="Madde <?php echo ($i+1); ?>">
                    </div>
                <?php } ?>
            </div>

            <hr style="border:none; border-bottom:1px solid #eee; margin:30px 0;">

            <h2>CTA (Aksiyon) Banner</h2>
            <table class="form-table">
                <tr>
                    <th>CTA Başlığı</th>
                    <td><input type="text" name="cta_title" value="<?php echo esc_attr( avtakip_get_setting('cta_title') ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th>CTA Açıklaması</th>
                    <td><textarea name="cta_desc" rows="3" class="large-text"><?php echo esc_textarea( avtakip_get_setting('cta_desc') ); ?></textarea></td>
                </tr>
                <tr>
                    <th>Buton Metni</th>
                    <td><input type="text" name="cta_btn_text" value="<?php echo esc_attr( avtakip_get_setting('cta_btn_text') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Memnuniyet Etiketi (örn. Kullanıcı)</th>
                    <td><input type="text" name="cta_satisfaction_label" value="<?php echo esc_attr( avtakip_get_setting('cta_satisfaction_label') ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th>Memnuniyet Açıklaması</th>
                    <td><textarea name="cta_satisfaction_desc" rows="2" class="large-text"><?php echo esc_textarea( avtakip_get_setting('cta_satisfaction_desc') ); ?></textarea></td>
                </tr>
            </table>

            <p class="submit">
                <input type="submit" name="avtakip_save_settings" id="submit" class="button button-primary button-large" value="Ayarları Kaydet">
            </p>
        </form>
    </div>
    <?php
}
