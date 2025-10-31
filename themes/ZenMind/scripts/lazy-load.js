const cheerio = require('cheerio');

hexo.extend.filter.register('after_render:html', function(str, data) {
  if (!str) return str;
  
  const $ = cheerio.load(str, {
    decodeEntities: false
  });

  // 处理所有图片，但排除favicon.png
  $('img').each(function() {
    const $img = $(this);
    const src = $img.attr('src');
    
    // 排除favicon.png
    if (src && !src.includes('favicon.png') && !src.includes('github.png') && !src.includes('mail.png') && !src.includes('rss-fill.png')&& !src.includes('Telegram.png')) {
      // 创建图片容器
      const $container = $('<div class="image-container loading"></div>');
      
      // 添加懒加载属性
      $img.attr('data-src', src);
      $img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'); // 1x1 透明图片
      $img.attr('loading', 'lazy');
      
      // 添加加载状态类
      $img.addClass('lazy-image');
      
      // 将图片包装在容器中
      $img.wrap($container);
    }
  });

  return $.html();
}); 