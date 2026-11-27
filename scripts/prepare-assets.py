"""把原站素材整理成站点可直接用的尺寸，并抓取 QQ 头像。

原站图片是 1920x1080 的原图（单张 1MB 上下），直接搬进 Vite 产物会让首屏等很久。
这里按区块实际显示宽度缩放、转成 WebP，产物从 11MB 降到 0.6MB 左右。

输出目录是 `src/assets/img/*.webp` 而不是 `public/img/`：
EdgeOne Pages 给 `/assets/*` 的响应头是 `max-age=31536000`，给 `/img/*` 的是
`max-age=0, must-revalidate`。图片交给 Vite 资产管线（进 src/assets）才会带内容哈希
并落到 `/assets/`，回访才能命中一年缓存；放 public 里每次访问都要重新校验 20 多次。

用法：python3 scripts/prepare-assets.py
"""
from pathlib import Path
import urllib.request

from PIL import Image

SRC = Path('/root/workspace/src/scweb-main/assets/img')
DST = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'img'

# (源文件, 输出名, 最大宽度, WebP 质量)
JOBS = [
    ('top.jpg', 'hero', 1600, 76),
    ('myd.jpg', 'satisfaction', 1200, 74),
    ('portfolio/img-1.jpg', 'portfolio/1', 1000, 74),
    ('portfolio/img-2.jpg', 'portfolio/2', 1000, 74),
    ('portfolio/img-3.jpg', 'portfolio/3', 1000, 74),
    ('portfolio/img-4.jpg', 'portfolio/4', 1000, 74),
    ('portfolio/img-5.jpg', 'portfolio/5', 1000, 74),
    ('portfolio/img-6.jpg', 'portfolio/6', 1000, 74),
    ('notice/1.jpg', 'notice/1', 900, 74),
    ('notice/2.jpg', 'notice/2', 900, 74),
    ('notice/3.jpg', 'notice/3', 900, 74),
    # teamlogo0.png 其实是 JPEG，且是正方形工作室标志，改回正确的扩展名
    ('teamlogo0.png', 'logo-mark', 96, 82),
]

AVATARS = {
    '2457483710': 'yushu',
    '953595252': 'xinnian',
    '1705593898': 'xuehonghui',
    '3031952142': 'shuishen',
    '2471258612': 'fengxuanye',
    '1258341177': 'huoyao',
    '3014786442': 'zero',
    '2839964480': 'smiley',
    '2229222686': 'yimeng',
    '3569965885': '1xc0',
    '2040606912': 'huoyao-msg',
    '2096852468': 'xuehonghui-msg',
    '2571960299': 'lgx',
}


def convert(src_name: str, dst_name: str, width: int, quality: int) -> None:
    src = SRC / src_name
    dst = DST / f'{dst_name}.webp'
    with Image.open(src) as im:
        alpha = im.mode in ('RGBA', 'LA')
        im = im.convert('RGBA' if alpha else 'RGB')
        if im.width > width:
            height = round(im.height * width / im.width)
            im = im.resize((width, height), Image.LANCZOS)
        dst.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst, 'WEBP', quality=quality, method=6)
        size = dst.stat().st_size // 1024
    print(f'{(dst_name + ".webp"):<24} {im.width}x{im.height}  {size} KB')


def avatar(uin: str, slug: str) -> None:
    dst = DST / 'avatar' / f'{slug}.webp'
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists():
        print(f'avatar/{slug}.webp          (已存在)')
        return
    url = f'http://q.qlogo.cn/headimg_dl?dst_uin={uin}&spec=640&img_type=jpg'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read()
    except Exception as exc:  # 头像是外部资源，抓不到就退回首字母兜底
        print(f'avatar/{slug}.webp          跳过（{exc}）')
        return
    tmp = dst.with_suffix('.tmp')
    tmp.write_bytes(raw)
    with Image.open(tmp) as im:
        im = im.convert('RGB')
        side = min(im.size)
        left = (im.width - side) // 2
        top = (im.height - side) // 2
        im = im.crop((left, top, left + side, top + side)).resize((96, 96), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=80, method=6)
    tmp.unlink()
    print(f'avatar/{slug}.webp          {dst.stat().st_size // 1024} KB')


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    for job in JOBS:
        convert(*job)
    # 页脚用的横版 Logo 保留透明通道
    with Image.open(SRC / 'logo.png') as im:
        im = im.convert('RGBA')
        im.thumbnail((480, 480), Image.LANCZOS)
        out = DST / 'logo-wide.webp'
        im.save(out, 'WEBP', quality=88, method=6)
        print(f'{"logo-wide.webp":<24} {im.width}x{im.height}  {out.stat().st_size // 1024} KB')
    for uin, slug in AVATARS.items():
        avatar(uin, slug)
    total = sum(f.stat().st_size for f in DST.rglob('*') if f.is_file())
    print(f'\n合计 {total / 1024:.0f} KB')
