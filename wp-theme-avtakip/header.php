<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
    <style>
        /* Mobile menu toggle state helper */
        body.mobile-menu-active .mobile-menu-container {
            height: auto !important;
            opacity: 1 !important;
            border-top-width: 1px;
        }
        body.mobile-menu-active .hamburger-icon-close {
            display: block !important;
        }
        body.mobile-menu-active .hamburger-icon-open {
            display: none !important;
        }
        
        /* Fixed scroll navbar state */
        body.scrolled nav.main-navbar {
            border-color: rgba(255, 255, 255, 0.1);
            background-color: rgba(7, 19, 21, 0.95);
            backdrop-filter: blur(24px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body <?php body_class( 'bg-[#07130f] text-[#f7f4ec] antialiased overflow-x-hidden' ); ?>>
<?php wp_body_open(); ?>

<?php
// Retrieve homepage dynamic configurations
$app_title = avtakip_get_setting('hero_title', 'Av Takip');
$play_store_url = avtakip_get_setting('play_store_url', 'https://play.google.com/store/apps/details?id=com.berkayaycelebi.avtakip');
$logo_url = avtakip_get_setting('app_logo_url');
if ( empty($logo_url) ) {
    $logo_url = 'https://lh3.googleusercontent.com/c2jHs_n3MWtvUNyGqNxQbcb5U1VDai7d8NOmzEgy05D0SdURi4eGxHnGHkB5UU9y1ttcii8ShXcIJiEMT0-O=s512';
}

$is_home = is_front_page();
$home_url = esc_url( home_url( '/' ) );
$ozellikler_link = $is_home ? '#ozellikler' : $home_url . '#ozellikler';
$ekranlar_link = $is_home ? '#ekranlar' : $home_url . '#ekranlar';
$blog_link = $home_url . 'blog/'; // Custom blog slug (we'll set this up)
?>

<header>
    <!-- Navbar -->
    <nav class="main-navbar fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[#07130f]/60 backdrop-blur-md transition-all duration-300">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            <!-- Logo & Brand -->
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3" aria-label="<?php echo esc_attr( $app_title ); ?> Ana Sayfa">
                <img src="<?php echo esc_url( $logo_url ); ?>" alt="" class="h-10 w-10 rounded-lg object-cover" width="40" height="40" />
                <span class="text-lg font-semibold tracking-normal text-white"><?php echo esc_html( $app_title ); ?></span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden items-center gap-1 md:flex">
                <a href="<?php echo esc_url( $ozellikler_link ); ?>" class="rounded-lg px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white">
                    Özellikler
                </a>
                <a href="<?php echo esc_url( $ekranlar_link ); ?>" class="rounded-lg px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white">
                    Ekranlar
                </a>
                <a href="<?php echo esc_url( $blog_link ); ?>" class="rounded-lg px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white">
                    Blog
                </a>
            </div>

            <!-- Download Button -->
            <div class="hidden items-center gap-3 md:flex">
                <a href="<?php echo esc_url( $play_store_url ); ?>" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-lg bg-[#d7f26f] px-4 py-2 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20">
                    <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.6 1.8 13.8 12 3.6 22.2a1 1 0 0 1-.6-.9V2.7a1 1 0 0 1 .6-.9Zm10.9 10.9 2.3 2.3-10.9 6.3 8.6-8.6Zm3.2-3.2 2.3 2.3-2 1.2-2.3-2.3 2-1.2ZM5.9 2.7 16.8 9l-2.3 2.3-8.6-8.6Z" />
                    </svg>
                    İndir
                </a>
            </div>

            <!-- Mobile Hamburger Button -->
            <button type="button" id="mobile-menu-trigger" aria-label="Menüyü aç veya kapat" class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-white transition-colors hover:bg-white/10 md:hidden">
                <!-- Hamburger Open Icon -->
                <svg class="hamburger-icon-open h-5 w-5 block" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <!-- Hamburger Close Icon -->
                <svg class="hamburger-icon-close h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu Container -->
        <div class="mobile-menu-container h-0 opacity-0 overflow-hidden border-white/10 bg-[#07130f] transition-all duration-300 md:hidden">
            <div class="px-4 py-3 space-y-1">
                <a href="<?php echo esc_url( $ozellikler_link ); ?>" class="mobile-menu-item block rounded-lg px-3 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/8">
                    Özellikler
                </a>
                <a href="<?php echo esc_url( $ekranlar_link ); ?>" class="mobile-menu-item block rounded-lg px-3 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/8">
                    Ekranlar
                </a>
                <a href="<?php echo esc_url( $blog_link ); ?>" class="mobile-menu-item block rounded-lg px-3 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/8">
                    Blog
                </a>
                <a href="<?php echo esc_url( $play_store_url ); ?>" target="_blank" rel="noreferrer" class="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#d7f26f] px-4 py-3 text-sm font-semibold text-[#102015] hover:bg-[#e7ff89]">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Google Play'den indir
                </a>
            </div>
        </div>
    </nav>
</header>
