<?php
/**
 * Fallback page template
 */
get_header();
?>
<main class="min-h-screen bg-[#07130f] text-white pt-24 pb-16">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
        <?php if (have_posts()) : ?>
            <div class="space-y-12">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('prose prose-invert max-w-none'); ?>>
                        <header class="mb-6">
                            <h1 class="text-3xl font-bold tracking-tight text-white mb-2">
                                <a href="<?php the_permalink(); ?>" class="hover:text-[#d7f26f] transition-colors">
                                    <?php the_title(); ?>
                                </a>
                            </h1>
                            <div class="text-sm text-stone-400">
                                <?php the_date(); ?>
                            </div>
                        </header>
                        <div class="entry-content">
                            <?php the_content(); ?>
                        </div>
                    </article>
                <?php endwhile; ?>
                <div class="nav-links mt-8 flex justify-between text-sm text-[#d7f26f]">
                    <div><?php previous_posts_link('« Yeni Yazılar'); ?></div>
                    <div><?php next_posts_link('Eski Yazılar »'); ?></div>
                </div>
            <?php else : ?>
                <p class="text-stone-400">İçerik bulunamadı.</p>
            <?php endif; ?>
    </div>
</main>
<?php
get_footer();
