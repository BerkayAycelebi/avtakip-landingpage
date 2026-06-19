<?php
/**
 * The template for displaying a single blog post
 */

get_header();

// Fetch settings
$play_store_url = avtakip_get_setting('play_store_url');
$blog_bg_image = get_template_directory_uri() . '/assets/images/blog-bg.jpg';

if ( have_posts() ) :
    while ( have_posts() ) : the_post();
        // Post image resolve
        $post_image = '';
        if ( has_post_thumbnail() ) {
            $post_image = get_the_post_thumbnail_url( get_the_ID(), 'large' );
        } else {
            $post_image = get_post_meta( get_the_ID(), '_custom_image_url', true );
        }
        if ( empty($post_image) ) {
            $post_image = get_template_directory_uri() . '/assets/images/blog-solunar.png';
        }

        // Category resolve
        $categories = get_the_category();
        $cat_name = !empty($categories) ? $categories[0]->name : 'Genel';
        $cat_id = !empty($categories) ? $categories[0]->term_id : 0;

        // Reading time
        $read_time = get_post_meta( get_the_ID(), '_read_time', true );
        if ( empty($read_time) ) {
            $read_time = '3 dk';
        }
        ?>

        <main class="min-h-screen bg-[#07130f] text-white">
            
            <!-- Header Links -->
            <header class="sticky top-0 z-50 border-b border-white/10 bg-[#07130f]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
                <div class="mx-auto flex max-w-6xl items-center justify-between">
                    <!-- Back Link -->
                    <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="group flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-white">
                        <svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Blog'a Dön
                    </a>

                    <!-- Share Button -->
                    <button type="button" id="share-post-btn" class="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 transition-colors hover:bg-white/10 hover:text-white" data-title="<?php the_title_attribute(); ?>" data-url="<?php the_permalink(); ?>">
                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        Paylaş
                    </button>
                </div>
            </header>

            <!-- Hero Section -->
            <section class="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 text-center">
                <!-- Hero BG -->
                <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: linear-gradient(to bottom, rgba(7, 19, 15, 0.15), #07130f), url('<?php echo esc_url($blog_bg_image); ?>');"></div>
                <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07130f] to-transparent"></div>
                
                <div class="relative mx-auto max-w-3xl px-4 sm:px-6 mt-10">
                    <div class="mb-6 inline-flex rounded-full bg-[#d7f26f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#d7f26f]">
                        <?php echo esc_html($cat_name); ?>
                    </div>
                    <h1 class="mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl text-white">
                        <?php the_title(); ?>
                    </h1>
                    <div class="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-stone-300 sm:gap-6">
                        <span class="flex items-center gap-2">
                            <svg class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5" />
                            </svg>
                            <?php echo esc_html( get_the_date() ); ?>
                        </span>
                        <span class="flex items-center gap-2">
                            <svg class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <?php echo esc_html($read_time); ?> okuma
                        </span>
                    </div>
                </div>
            </section>

            <!-- Main Layout with Sidebar -->
            <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div class="grid gap-12 lg:grid-cols-[1fr_300px]">
                    
                    <!-- Main Content Area -->
                    <article class="min-w-0">
                        <!-- Featured Image -->
                        <div class="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10 shadow-2xl">
                            <img src="<?php echo esc_url($post_image); ?>" alt="<?php the_title_attribute(); ?>" class="h-full w-full object-cover" />
                        </div>

                        <!-- Post Content Wrapper -->
                        <div class="prose prose-invert prose-stone max-w-none prose-headings:font-semibold prose-a:text-[#d7f26f] prose-img:rounded-xl prose-p:leading-relaxed prose-p:text-stone-300 prose-headings:text-white prose-strong:text-white">
                            <?php the_content(); ?>
                        </div>
                    </article>

                    <!-- Sidebar Area -->
                    <aside class="space-y-8 lg:border-l lg:border-white/10 lg:pl-8">
                        
                        <!-- Related Posts -->
                        <div>
                            <h3 class="mb-6 text-lg font-semibold text-white">İlgili Makaleler</h3>
                            <?php
                            $related_query = null;
                            if ( $cat_id ) {
                                $related_query = new WP_Query( array(
                                    'category__in'   => array( $cat_id ),
                                    'post__not_in'   => array( get_the_ID() ),
                                    'posts_per_page' => 3,
                                    'ignore_sticky_posts' => 1
                                ) );
                            }

                            if ( $related_query && $related_query->have_posts() ) :
                                ?>
                                <div class="space-y-6">
                                    <?php while ( $related_query->have_posts() ) : $related_query->the_post(); 
                                        $rel_image = '';
                                        if ( has_post_thumbnail() ) {
                                            $rel_image = get_the_post_thumbnail_url( get_the_ID(), 'medium' );
                                        } else {
                                            $rel_image = get_post_meta( get_the_ID(), '_custom_image_url', true );
                                        }
                                        if ( empty($rel_image) ) {
                                            $rel_image = get_template_directory_uri() . '/assets/images/blog-solunar.png';
                                        }
                                        ?>
                                        <a href="<?php the_permalink(); ?>" class="group block space-y-2">
                                            <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10">
                                                <img src="<?php echo esc_url($rel_image); ?>" alt="<?php the_title_attribute(); ?>" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                            </div>
                                            <h4 class="font-medium text-white transition-colors group-hover:text-[#d7f26f] line-clamp-2 text-sm leading-snug">
                                                <?php the_title(); ?>
                                            </h4>
                                            <p class="text-xs text-stone-500"><?php echo esc_html( get_the_date() ); ?></p>
                                        </a>
                                    <?php endwhile; wp_reset_postdata(); ?>
                                </div>
                            <?php else : ?>
                                <p class="text-sm text-stone-500">Bu kategoride başka makale bulunmuyor.</p>
                            <?php endif; ?>
                        </div>

                        <!-- Promotion Card -->
                        <div class="rounded-2xl border border-[#d7f26f]/20 bg-[#d7f26f]/5 p-6 shadow-xl">
                            <h4 class="text-sm font-semibold uppercase tracking-wider text-[#d7f26f]">
                                Av Takip Mobil
                            </h4>
                            <p class="mt-2 text-xs text-stone-300 leading-relaxed">
                                Avlak yerlerini kaydetmek, ekibinizi canlı takip etmek ve solunar takvimi kullanmak için uygulamayı indirin.
                            </p>
                            <a href="<?php echo esc_url($play_store_url); ?>" target="_blank" rel="noreferrer" class="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#d7f26f] py-2 text-xs font-semibold text-[#102015] hover:bg-[#e7ff89] transition-all">
                                Google Play'den İndir
                            </a>
                        </div>

                    </aside>

                </div>
            </div>

        </main>

        <!-- Social Share Script -->
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var shareBtn = document.getElementById('share-post-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', function() {
                    var title = this.getAttribute('data-title');
                    var url = this.getAttribute('data-url');
                    
                    if (navigator.share) {
                        navigator.share({
                            title: title,
                            url: url
                        }).catch(console.error);
                    } else {
                        // Fallback: copy link to clipboard
                        navigator.clipboard.writeText(url).then(function() {
                            alert('Yazı linki kopyalandı!');
                        }).catch(function() {
                            alert('Lütfen bu linki kopyalayın: ' + url);
                        });
                    }
                });
            }
        });
        </script>

        <?php
    endwhile;
endif;

get_footer();
