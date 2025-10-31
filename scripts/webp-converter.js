const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

hexo.extend.filter.register('before_post_render', function(data) {
  return Promise.resolve(data);
});

hexo.extend.filter.register('after_render:html', function(str, data) {
  if (!str) return str;
  
  const $ = cheerio.load(str, {
    decodeEntities: false
  });
  
  // 处理文章内容中的图片 - 处理所有img元素
  $('img').each(function() {
    const $img = $(this);
    let targetSrc = $img.attr('data-src') || $img.attr('src');
    const alt = $img.attr('alt') || '';
    
    // 跳过已经优化的图片和特殊图标
    if (!targetSrc || 
        targetSrc.includes('.webp') ||
        targetSrc.includes('favicon.png') ||
        targetSrc.includes('github.png') ||
        targetSrc.includes('mail.png') ||
        targetSrc.includes('rss-fill.png') ||
        targetSrc.includes('Telegram.png') ||
        targetSrc.includes('outwebsite.png') ||
        targetSrc.includes('outwebsite.svg') ||
        alt.toLowerCase().includes('icon') ||
        targetSrc.includes('data:image/')) { // 跳过数据URI
      return;
    }
    
    // 检查是否是本地图片且需要转换
    if ((targetSrc.startsWith('/img/') || targetSrc.startsWith('/images/') || targetSrc.startsWith('./img/') || targetSrc.startsWith('./images/')) 
        && /\.(jpg|jpeg|png|heic)$/i.test(targetSrc)) {
      
      const originalSrc = targetSrc;
      // 构造WebP文件路径
      const webpSrc = targetSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // 更新相应的属性为WebP
      if ($img.attr('data-src')) {
        $img.attr('data-src', webpSrc);
      }
      if ($img.attr('src')) {
        $img.attr('src', webpSrc);
      }
      
      // 更新其父容器的属性（如果有的话）
      const $container = $img.closest('.image-container');
      if ($container.length && $container.attr('data-src')) {
        $container.attr('data-src', webpSrc);
      }
      
      console.log(`WebP转换: ${originalSrc} → ${webpSrc}`);
    }
  });
  
  return $.html();
});

// 处理静态资源文件，生成WebP版本
// 首先在生成前处理 source/img，这样生成的 webp 会被 Hexo 自动复制到 public
hexo.extend.filter.register('before_generate', async function() {
  const sourceDir = hexo.source_dir;
  const sourceImgDir = path.join(sourceDir, 'img');
  
  try {
    await processImages(sourceImgDir);
    console.log('✅ source/img 目录处理完成');
  } catch (error) {
    console.log('⚠️  处理 source/img 目录:', error.message || '目录不存在或已跳过');
  }
});

// 在生成后再次检查 public/img，确保所有图片都有对应的 webp
hexo.extend.filter.register('after_generate', async function() {
  const publicDir = hexo.public_dir;
  const publicImgDir = path.join(publicDir, 'img');
  
  try {
    await processImages(publicImgDir);
    console.log('✅ public/img 目录处理完成');
  } catch (error) {
    console.log('⚠️  处理 public/img 目录:', error.message || '目录不存在或已跳过');
  }
});

async function processImages(dir) {
  try {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await processImages(filePath);
        continue;
      }
      
    // 只处理图片文件
    if (/\.(jpg|jpeg|png|heic)$/i.test(file)) {
      await generateWebP(filePath);
    }
    }
  } catch (error) {
    console.log('图片处理完成或已跳过不必要的文件');
  }
}

async function generateWebP(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const webpPath = inputPath.replace(/\.(jpg|jpeg|png|heic)$/i, '.webp');
    
    // 检查WebP是否已存在且比原文件新
    try {
      const webpStat = await fs.stat(webpPath);
      const inputStat = await fs.stat(inputPath);
      
      if (webpStat.mtime > inputStat.mtime) {
        // WebP已存在且更新，跳过
        return;
      }
    } catch (err) {
      // WebP不存在，继续创建
    }
    
    console.log(`生成WebP: ${path.basename(inputPath)} → ${path.basename(webpPath)}`);
    
    // 获取配置
    const config = hexo.config.webp_converter || {};
    const quality = config.quality || 80;
    const effort = config.effort || 6;
    const maxWidth = config.max_width || 1200;
    const maxHeight = config.max_height || 1200;
    
    // 获取原图尺寸，限制最大尺寸以提高加载速度
    const metadata = await sharp(inputPath).metadata();
    let sharpInstance = sharp(inputPath);
    
    // 如果图片过大，先缩放
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // 生成WebP
    await sharpInstance
      .webp({
        quality: quality,
        effort: effort
      })
      .toFile(webpPath);
    
    const originalSize = (await fs.stat(inputPath)).size;
    const webpSize = (await fs.stat(webpPath)).size;
    const saved = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → WebP: 节省 ${saved}%`);
  } catch (error) {
    console.error(`❌ WebP生成失败: ${inputPath}`, error.message);
  }
}
