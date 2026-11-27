"""把原站素材整理成站点可直接用的尺寸，并抓取 QQ 头像。

原站图片是 1920x1080 的原图（单张 1MB 上下），直接搬进 Vite 产物会让首屏等很久。
这里按区块实际显示宽度缩放并重新编码，产物从 11MB 降到 1MB 左右。

用法：python3 scripts/prepare-assets.py
"""
from pathlib import Path
import urllib.request

from PIL import Image

SRC = Path('/root/workspace/src/scweb-main/assets/img')
DST = Path(__file__).resolve().parent.parent / 'public' / 'img'

JOBS = [
    ('top.jpg', 'hero.jpg', 1600, 82),
    ('myd.jpg', 'satisfaction.jpg', 1200, 80),
    ('portfolio/img-1.jpg', 'portfolio/1.jpg', 1000, 80),
    ('portfolio/img-2.jpg', 'portfolio/2.jpg', 1000, 80),
    ('portfolio/img-3.jpg', 'portfolio/3.jpg', 1000, 80),
    ('portfolio/img-4.jpg', 'portfolio/4.jpg', 1000, 80),
    ('portfolio/img-5.jpg', 'portfolio/5.jpg', 1000, 80),
    ('portfolio/img-6.jpg', 'portfolio/6.jpg', 1000, 80),
    ('notice/1.jpg', 'notice/1.jpg', 900, 78),
    ('notice/2.jpg', 'notice/2.jpg', 900, 78),
    ('notice/3.jpg', 'notice/3.jpg', 900, 78),
    # teamlogo0.png 其实是 JPEG，且是正方形工作室标志，改回正确的扩展名
    ('teamlogo0.png', 'logo-mark.jpg', 320, 88),
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
    dst = DST / dst_name
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = im.convert('RGB')
        if im.width > width:
            height = round(im.height * width / im.width)
            im = im.resize((width, height), Image.LANCZOS)
        im.save(dst, 'JPEG', quality=quality, optimize=True, progressive=True)
    print(f'{dst_name:24} {im.width}x{im.height}  {dst.stat().st_size // 1024} KB')


def avatar(uin: str, slug: str) -> None:
    dst = DST / 'avatar' / f'{slug}.jpg'
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists():
        print(f'avatar/{slug}.jpg          (已存在)')
        return
    url = f'http://q.qlogo.cn/headimg_dl?dst_uin={uin}&spec=640&img_type=jpg'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read()
    except Exception as exc:  # 头像是外部资源，抓不到就退回首字母兜底
        print(f'avatar/{slug}.jpg          跳过（{exc}）')
        return
    tmp = dst.with_suffix('.tmp')
    tmp.write_bytes(raw)
    with Image.open(tmp) as im:
        im = im.convert('RGB')
        side = min(im.size)
        left = (im.width - side) // 2
        top = (im.height - side) // 2
        im = im.crop((left, top, left + side, top + side)).resize((192, 192), Image.LANCZOS)
        im.save(dst, 'JPEG', quality=86, optimize=True)
    tmp.unlink()
    print(f'avatar/{slug}.jpg          {dst.stat().st_size // 1024} KB')


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    for job in JOBS:
        convert(*job)
    # 页脚用的横版 Logo 保留 PNG 透明通道
    with Image.open(SRC / 'logo.png') as im:
        im.thumbnail((360, 360), Image.LANCZOS)
        im.save(DST / 'logo-wide.png', 'PNG', optimize=True)
    print(f'logo-wide.png            {im.width}x{im.height}  {(DST / "logo-wide.png").stat().st_size // 1024} KB')
    for uin, slug in AVATARS.items():
        avatar(uin, slug)
    total = sum(f.stat().st_size for f in DST.rglob('*') if f.is_file())
    print(f'\n合计 {total / 1024 / 1024:.1f} MB')


if __name__ == '__main__':
    main()
