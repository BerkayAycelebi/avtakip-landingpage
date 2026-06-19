<?php
/**
 * The template for displaying the blog archive (listing)
 */

get_header();

// Fetch settings
$app_title = avtakip_get_setting('hero_title', 'Av Takip');
$logo_url = avtakip_get_setting('app_logo_url');
if ( empty($logo_url) ) {
    $logo_url = 'https://lh3.googleusercontent.com/c2jHs_n3MWtvUNyGqNxQbcb5U1VDai7d8NOmzEgy05D0SdURi4eGxHnGHkB5UU9y1ttcii8ShXcIJiEMT0-O=s512';
}

$blog_bg_image = get_template_directory_uri() . '/assets/images/blog-bg.jpg';
?>

<main class="min-h-screen bg-[#07130f] text-white">

    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-white/10 py-20 lg:py-24">
        <!-- Hero Background -->
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: linear-gradient(to bottom, rgba(7, 19, 15, 0.15), #07130f), url('<?php echo esc_url($blog_bg_image); ?>');"></div>
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07130f] to-transparent"></div>
        
        <div class="relative mx-auto max-w-5xl px-4 sm:px-6 mt-10">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <?php echo esc_html($app_title); ?> Blog
            </h1>
            <p class="mt-4 max-w-2xl text-lg text-stone-300">
                Avcılık ipuçları, yeni özellik duyuruları ve sahadan en iyi pratikler hakkında yazılarımız.
            </p>
        </div>
    </section>

    <!-- Content Grid Section -->
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <?php if ( have_posts() ) : ?>
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <?php while ( have_posts() ) : the_post(); 
                    // Post Image resolve
                    $post_image = '';
                    if ( has_post_thumbnail() ) {
                        $post_image = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                    } else {
                        $post_image = get_post_meta( get_the_ID(), '_custom_image_url', true );
                    }
                    if ( empty($post_image) ) {
                        // fallback to a template asset if nothing exists
                        $post_image = get_template_directory_uri() . '/assets/images/blog-solunar.png';
                    }

                    // Category Name resolve
                    $categories = get_the_category();
                    $cat_name = !empty($categories) ? $categories[0]->name : 'Genel';

                    // Reading time resolve
                    $read_time = get_post_meta( get_the_ID(), '_read_time', true );
                    if ( empty($read_time) ) {
                        $read_time = '3 dk';
                    }
                    ?>
                    <a href="<?php the_permalink(); ?>" class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1d17] transition-all duration-300 hover:border-[#d7f26f]/30 hover:bg-[#162a22]">
                        <!-- Card Image -->
                        <div class="relative aspect-[16/10] overflow-hidden bg-black/20">
                            <img src="<?php echo esc_url($post_image); ?>" alt="<?php the_title_attribute(); ?>" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div class="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-[#d7f26f] backdrop-blur-md">
                                <?php echo esc_html($cat_name); ?>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="flex flex-1 flex-col p-6">
                            <h2 class="mb-3 text-xl font-semibold text-white group-hover:text-[#d7f26f] transition-colors">
                                <?php the_title(); ?>
                            </h2>
                            <p class="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-400">
                                <?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?>
                            </p>

                            <!-- Card Footer -->
                            <div class="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-stone-500">
                                <div class="flex items-center gap-3">
                                    <!-- Date -->
                                    <span class="flex items-center gap-1.5">
                                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5" />
                                        </svg>
                                        <?php echo esc_html( get_the_date('j M Y') ); ?>
                                    </span>
                                    <!-- Read Time -->
                                    <span class="flex items-center gap-1.5">
                                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <?php echo esc_html($read_time); ?>
                                    </span>
                                </div>
                                
                                <!-- Arrow -->
                                <svg class="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-[#d7f26f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </div>
                    </a>
                <?php endwhile; ?>
            </div>
            
            <!-- Navigation -->
            <div class="mt-12 flex justify-between text-sm">
                <div class="text-[#d7f26f] hover:underline"><?php next_posts_link('« Eski Yazılar'); ?></div>
                <div class="text-[#d7f26f] hover:underline"><?php previous_posts_link('Yeni Yazılar »'); ?></div>
            </div>

        <?php else : ?>
            <div class="text-center py-12">
                <p class="text-stone-400">Henüz yayınlanmış bir blog yazısı bulunmamaktadır.</p>
            </div>
        <?php endif; ?>
    </div>

</main>

<?php
get_footer();
