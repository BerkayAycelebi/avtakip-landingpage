<?php
/**
 * Theme Footer Template
 */

$app_title = avtakip_get_setting('hero_title', 'Av Takip');
$logo_url = avtakip_get_setting('app_logo_url');
if ( empty($logo_url) ) {
    $logo_url = 'https://lh3.googleusercontent.com/c2jHs_n3MWtvUNyGqNxQbcb5U1VDai7d8NOmzEgy05D0SdURi4eGxHnGHkB5UU9y1ttcii8ShXcIJiEMT0-O=s512';
}

$is_home = is_front_page();
$home_url = esc_url( home_url( '/' ) );
$ozellikler_link = $is_home ? '#ozellikler' : $home_url . '#ozellikler';
$blog_link = $home_url . 'blog/';
?>

<footer class="border-t border-white/10 px-4 py-10 sm:px-6">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
        <!-- Logo & Title -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3 text-white">
            <img src="<?php echo esc_url( $logo_url ); ?>" alt="" class="h-8 w-8 rounded-lg object-cover" width="32" height="32" />
            <span class="font-semibold text-white"><?php echo esc_html( $app_title ); ?></span>
        </a>

        <!-- Footer Links -->
        <div class="flex flex-wrap gap-5">
            <a href="<?php echo esc_url( $ozellikler_link ); ?>" class="transition-colors hover:text-white footer-scroll-link">
                Özellikler
            </a>
            <a href="<?php echo esc_url( $blog_link ); ?>" class="transition-colors hover:text-white">
                Blog
            </a>
            <a href="mailto:info@avtakip.com" class="transition-colors hover:text-white">
                İletişim
            </a>
        </div>

        <!-- Copyright -->
        <p>© <?php echo date('Y'); ?> <?php echo esc_html( $app_title ); ?>. Tüm hakları saklıdır.</p>
    </div>
</footer>

<!-- Interactive Scripts -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    var menuTrigger = document.getElementById('mobile-menu-trigger');
    var mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    if (menuTrigger) {
        menuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            document.body.classList.toggle('mobile-menu-active');
        });
    }

    // Close mobile menu when clicking menu items or clicking outside
    mobileMenuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            document.body.classList.remove('mobile-menu-active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu-container') && !e.target.closest('#mobile-menu-trigger')) {
            document.body.classList.remove('mobile-menu-active');
        }
    });

    // 2. Scrolled Header Effect
    function updateScrollState() {
        if (window.scrollY > 40) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // 3. Smooth scroll offsets for anchor links
    var smoothScrollLinks = document.querySelectorAll('a[href^="#"], a[href*="#ozellikler"], a[href*="#ekranlar"]');
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            var hash = href.substring(href.indexOf('#'));
            var targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // If it is on the same page, do smooth scroll
                if (window.location.pathname === '/' || window.location.pathname === '<?php echo wp_make_link_relative(home_url("/")); ?>' || href.startsWith('#')) {
                    e.preventDefault();
                    var headerOffset = 80;
                    var elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - headerOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
</script>

<?php wp_footer(); ?>
</body>
</html>
