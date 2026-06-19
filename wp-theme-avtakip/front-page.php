<?php
/**
 * The template for displaying the homepage/landing page
 */

get_header();

// Fetch settings
$hero_badge = avtakip_get_setting('hero_badge');
$hero_title = avtakip_get_setting('hero_title');
$hero_subtitle = avtakip_get_setting('hero_subtitle');
$play_store_url = avtakip_get_setting('play_store_url');
$cta_primary = avtakip_get_setting('hero_cta_primary');
$cta_secondary = avtakip_get_setting('hero_cta_secondary');

$downloads = avtakip_get_setting('downloads');
$rating = avtakip_get_setting('rating');
$city_count = intval(avtakip_get_setting('city_count'));
$satisfaction = intval(avtakip_get_setting('satisfaction'));

// Image fallbacks
$app_mockup_url = avtakip_get_setting('app_mockup_url');
if ( empty($app_mockup_url) ) {
    $app_mockup_url = 'https://lh3.googleusercontent.com/j3pJuOBaKcl2qb9DxyhXvMc5gMCMZxO68exgg-Fl_fsBxwxUHBqP8j9u22aP5ie7d8tK1feZ2FRmks9v6PJY5Pk=s1043';
}

$app_features_url = avtakip_get_setting('app_features_url');
if ( empty($app_features_url) ) {
    $app_features_url = 'https://lh3.googleusercontent.com/Xl-wKeCyAncaPBkKOYbrgKxz8E9UJK-IVLJr8KsPCRun9T4tO0CV1AXkSIL6vZ95qltEHQ_pjfmds2f7BqqWDA=s1024';
}

// Features
$features_label = avtakip_get_setting('features_label');
$features_title = avtakip_get_setting('features_title');
$features = avtakip_get_setting('features', []);

// Screens
$screens_label = avtakip_get_setting('screens_label');
$screens_title = avtakip_get_setting('screens_title');
$screens_desc = avtakip_get_setting('screens_desc');
$screens_checklist = avtakip_get_setting('screens_checklist', []);

// CTA Banner
$cta_title = avtakip_get_setting('cta_title');
$cta_desc = avtakip_get_setting('cta_desc');
$cta_btn_text = avtakip_get_setting('cta_btn_text');
$cta_satisfaction_label = avtakip_get_setting('cta_satisfaction_label');
$cta_satisfaction_desc = avtakip_get_setting('cta_satisfaction_desc');

// Helper to render inline SVG icons matching Lucide
function avtakip_render_svg_icon($icon_name, $class_names = 'h-5 w-5') {
    switch ($icon_name) {
        case 'CalendarDays':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5M9.75 12h.008v.008H9.75V12Zm0 2.25h.008v.008H9.75v-.008Zm0 2.25h.008v.008H9.75V16.5Zm4.5-4.5h.008v.008H14.25V12Zm0 2.25h.008v.008H14.25v-.008Zm0 2.25h.008v.008H14.25V16.5Zm2.25-4.5h.008v.008H16.5V12Zm0 2.25h.008v.008H16.5v-.008Zm-6.75 0h.008v.008H9.75v-.008Zm0 2.25h.008v.008H9.75V16.5Z" /></svg>';
        case 'MapPin':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>';
        case 'Radio':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2" /><path stroke-linecap="round" d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></svg>';
        case 'CloudSun':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" /></svg>';
        case 'Users':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0 1 12.75 21.5h-1.5a2.25 2.25 0 0 1-2.25-2.263V19.13m4.5-.002v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128A9.333 9.333 0 0 0 9 15.122a9.333 9.333 0 0 0-6 4.006m-.003 0h12m-6-11.25a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75ZM15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>';
        case 'ShieldCheck':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>';
        case 'Compass':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L15 9l-3.75 6L9 12.75z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>';
        case 'Star':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.172-.468.842-.468 1.012 0l2.198 5.969a1.002 1.002 0 0 0 .95.69h6.273c.5 0 .708.639.302.95l-5.074 3.896a1 1 0 0 0-.364 1.118l1.96 5.955c.149.453-.368.819-.752.54l-5.075-3.727a1 1 0 0 0-1.17 0l-5.075 3.727c-.384.279-.901-.087-.752-.54l1.96-5.955a1 1 0 0 0-.364-1.118L2.26 11.108c-.406-.311-.197-.95.302-.95h6.272a1.002 1.002 0 0 0 .95-.69L11.48 3.5Z" /></svg>';
        case 'Download':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>';
        case 'Check':
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>';
        default:
            return '<svg class="' . esc_attr($class_names) . '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.172-.468.842-.468 1.012 0l2.198 5.969a1.002 1.002 0 0 0 .95.69h6.273c.5 0 .708.639.302.95l-5.074 3.896a1 1 0 0 0-.364 1.118l1.96 5.955c.149.453-.368.819-.752.54l-5.075-3.727a1 1 0 0 0-1.17 0l-5.075 3.727c-.384.279-.901-.087-.752-.54l1.96-5.955a1 1 0 0 0-.364-1.118L2.26 11.108c-.406-.311-.197-.95.302-.95h6.272a1.002 1.002 0 0 0 .95-.69L11.48 3.5Z" /></svg>';
    }
}
?>

<main class="min-h-screen bg-[#07130f] text-white">

    <!-- Hero Section -->
    <section class="relative min-h-[92vh] overflow-hidden pt-16">
        <!-- Background Gradient and Image -->
        <?php
        // Try to load the localized background, fall back if file is missing
        $bg_image_path = get_template_directory_uri() . '/assets/images/av-takip-hero-hunting.png';
        ?>
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: linear-gradient(120deg, rgba(7, 19, 15, 0.9), rgba(7, 19, 15, 0.55) 48%, rgba(7, 19, 15, 0.78)), url('<?php echo esc_url($bg_image_path); ?>');"></div>
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07130f] to-transparent"></div>

        <div class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:py-24">
            <!-- Left Info Area -->
            <div class="max-w-3xl">
                <!-- Badge -->
                <div class="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#d7f26f]/35 bg-[#d7f26f]/10 px-3 py-2 text-sm font-medium text-[#e6ff86]">
                    <?php echo avtakip_render_svg_icon('Compass', 'h-4 w-4'); ?>
                    <?php echo esc_html($hero_badge); ?>
                </div>

                <!-- Main Title -->
                <h1 class="text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                    <?php echo esc_html($hero_title); ?>
                </h1>

                <!-- Subtitle -->
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-200 sm:text-xl">
                    <?php echo esc_html($hero_subtitle); ?>
                </p>

                <!-- CTA Action Buttons -->
                <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href="<?php echo esc_url($play_store_url); ?>" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-3 rounded-lg bg-[#d7f26f] px-6 py-4 text-base font-semibold text-[#102015] transition-all hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg hover:shadow-[#d7f26f]/25">
                        <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.6 1.8 13.8 12 3.6 22.2a1 1 0 0 1-.6-.9V2.7a1 1 0 0 1 .6-.9Zm10.9 10.9 2.3 2.3-10.9 6.3 8.6-8.6Zm3.2-3.2 2.3 2.3-2 1.2-2.3-2.3 2-1.2ZM5.9 2.7 16.8 9l-2.3 2.3-8.6-8.6Z" />
                        </svg>
                        <?php echo esc_html($cta_primary); ?>
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                    <a href="#ozellikler" class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-6 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:scale-[1.03] active:scale-[0.98] hover:bg-white/12">
                        <?php echo esc_html($cta_secondary); ?>
                    </a>
                </div>

                <!-- Stats Badges -->
                <div class="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm text-stone-300">
                    <div class="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25 hover:scale-[1.04] duration-300">
                        <strong class="block text-2xl text-white"><?php echo esc_html($downloads); ?></strong>
                        indirme
                    </div>
                    <div class="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25 hover:scale-[1.04] duration-300">
                        <strong class="flex items-center gap-1 text-2xl text-white">
                            <?php echo esc_html($rating); ?>
                            <svg class="h-4 w-4 fill-[#d7f26f] text-[#d7f26f]" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </strong>
                        puan
                    </div>
                    <div class="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25 hover:scale-[1.04] duration-300">
                        <strong class="block text-2xl text-white counter-animate" data-target="<?php echo $city_count; ?>">0</strong>
                        şehir
                    </div>
                </div>
            </div>

            <!-- Right Mockup Image -->
            <div class="mx-auto w-full max-w-[380px] md:max-w-[430px]">
                <div class="relative aspect-[9/16] animate-bounce-slow">
                    <img src="<?php echo esc_url($app_mockup_url); ?>" alt="Av Takip uygulamasının mobil ekran görüntüsü" class="h-full w-full object-contain drop-shadow-[0_34px_70px_rgba(0,0,0,0.45)]" />
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="ozellikler" class="px-4 py-20 sm:px-6">
        <div class="mx-auto max-w-7xl">
            <!-- Headers -->
            <div class="max-w-2xl">
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]">
                    <?php echo esc_html($features_label); ?>
                </p>
                <h2 class="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                    <?php echo esc_html($features_title); ?>
                </h2>
            </div>

            <!-- Grid Items -->
            <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <?php
                if ( ! empty($features) && is_array($features) ) :
                    foreach ( $features as $feat ) :
                        $icon = isset($feat['icon']) ? $feat['icon'] : 'Star';
                        $title = isset($feat['title']) ? $feat['title'] : '';
                        $desc = isset($feat['description']) ? $feat['description'] : '';
                        ?>
                        <article class="group rounded-xl border border-white/10 bg-[#0d1d17] p-6 transition-all duration-300 hover:-translate-y-[6px] hover:border-[#d7f26f]/30 hover:bg-[#0d1d17]/80">
                            <!-- Icon Wrapper -->
                            <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#d7f26f] text-[#102015] transition-transform duration-300 group-hover:scale-110">
                                <?php echo avtakip_render_svg_icon($icon, 'h-5 w-5'); ?>
                            </div>
                            <h3 class="text-xl font-semibold text-white"><?php echo esc_html($title); ?></h3>
                            <p class="mt-3 leading-7 text-stone-300"><?php echo esc_html($desc); ?></p>
                        </article>
                        <?php
                    endforeach;
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Screens section -->
    <section id="ekranlar" class="border-y border-white/10 bg-[#101816] px-4 py-20 sm:px-6">
        <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <!-- Checklist Text -->
            <div class="max-w-xl">
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]">
                    <?php echo esc_html($screens_label); ?>
                </p>
                <h2 class="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                    <?php echo esc_html($screens_title); ?>
                </h2>
                <p class="mt-5 leading-8 text-stone-300">
                    <?php echo esc_html($screens_desc); ?>
                </p>
                
                <div class="mt-8 grid gap-3">
                    <?php
                    if ( ! empty($screens_checklist) && is_array($screens_checklist) ) :
                        foreach ( $screens_checklist as $item ) :
                            if ( empty($item) ) continue;
                            ?>
                            <div class="flex items-center gap-3 text-stone-200">
                                <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-[#d7f26f] text-[#102015]">
                                    <?php echo avtakip_render_svg_icon('Check', 'h-4 w-4'); ?>
                                </span>
                                <?php echo esc_html($item); ?>
                            </div>
                            <?php
                        endforeach;
                    endif;
                    ?>
                </div>
            </div>

            <!-- Image Mockup Grid -->
            <div class="overflow-hidden rounded-xl border border-white/10 bg-[#07130f] shadow-2xl shadow-black/30 transition-transform duration-300 hover:scale-[1.02]">
                <img src="<?php echo esc_url($app_features_url); ?>" alt="Av Takip uygulama özellik ekranları" class="h-auto w-full object-cover" width="1024" height="768" />
            </div>
        </div>
    </section>

    <!-- Call to Action (CTA) Section -->
    <section class="px-4 py-20 sm:px-6">
        <div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <!-- Left Banner -->
            <div class="rounded-xl border border-white/10 bg-[#16211d] p-8 md:col-span-2">
                <h2 class="max-w-2xl text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                    <?php echo esc_html($cta_title); ?>
                </h2>
                <p class="mt-5 max-w-2xl leading-8 text-stone-300">
                    <?php echo esc_html($cta_desc); ?>
                </p>
                <a href="<?php echo esc_url($play_store_url); ?>" target="_blank" rel="noreferrer" class="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#d7f26f] px-6 py-4 font-semibold text-[#102015] transition-all hover:scale-[1.04] active:scale-[0.97] hover:shadow-lg hover:shadow-[#d7f26f]/25">
                    <?php echo avtakip_render_svg_icon('Download', 'h-5 w-5'); ?>
                    <?php echo esc_html($cta_btn_text); ?>
                </a>
            </div>

            <!-- Right Satisfaction Indicator -->
            <div class="rounded-xl border border-white/10 bg-[#0d1d17] p-8">
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]">
                    <?php echo esc_html($cta_satisfaction_label); ?>
                </p>
                <strong class="mt-4 block text-5xl text-white">
                    %<span class="counter-animate" data-target="<?php echo $satisfaction; ?>">0</span>
                </strong>
                <p class="mt-4 leading-7 text-stone-300">
                    <?php echo esc_html($cta_satisfaction_desc); ?>
                </p>
            </div>
        </div>
    </section>

</main>

<!-- Extra Inline Styles/Scripts -->
<style>
/* CSS bouncing animation */
@keyframes bounce-slow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}
.animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
}
</style>

<script>
// Animate numbers when scrolled into view (replicates Framer Motion AnimatedCounter)
document.addEventListener('DOMContentLoaded', function() {
    var animateNumbers = document.querySelectorAll('.counter-animate');
    
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var targetVal = parseInt(el.getAttribute('data-target'));
                    var currentVal = 0;
                    var duration = 1500; // ms
                    var stepTime = Math.abs(Math.floor(duration / targetVal));
                    
                    // Throttle stepTime so it's not too fast/slow
                    stepTime = Math.max(stepTime, 10);
                    
                    var timer = setInterval(function() {
                        currentVal += Math.ceil(targetVal / (duration / stepTime));
                        if (currentVal >= targetVal) {
                            el.textContent = targetVal;
                            clearInterval(timer);
                        } else {
                            el.textContent = currentVal;
                        }
                    }, stepTime);
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        
        animateNumbers.forEach(function(item) {
            observer.observe(item);
        });
    } else {
        // Fallback for older browsers
        animateNumbers.forEach(function(item) {
            item.textContent = item.getAttribute('data-target');
        });
    }
});
</script>

<?php
get_footer();
