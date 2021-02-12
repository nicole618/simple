const $addSite = $('.sitList .addSite')
const $sitList = $('.siteMain .sitList')
const sitListLi = document.querySelectorAll('.siteMain .sitList li')
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hashMap = xObject || [{ logo: 'A', url: 'https://www.baidu.com/', bgColor: '#ac4173' }, { logo: 'T', url: 'https://www.taobao.com/', bgColor: '#79b462' }]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}
const render = () => {
    $sitList.find('li:not(.addSite)').remove()
    hashMap.forEach((element, index) => {
        if (index > 8) { return }
        const $li = $(`
        <li>
        <div class="site">
            <div class="logo">${element.logo}</div>
            <div class="logoName">${simplifyUrl(element.url)}</div>
            <div class="more">
            <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-more"></use>
                    </svg>
            </div>
            <div class ='moreDetail'>
            <div class='modifyUrl'>编辑</div>
            <div class='close'>移除</div>
            </div>
        </div>
    </li>`).insertBefore($addSite)
        $li.on('click', () => {
            window.open(element.url)
        })
        $li.on('click', '.close', (e) => {
            hashMap.splice(index, 1)
            render()
            e.stopPropagation()
        })
        $li.on('click', '.moreDetail', (e) => {
            e.stopPropagation()
        })
        $li.on('click', '.more', (e) => {
            $li.find('.moreDetail').addClass('block').end().siblings().find('.moreDetail').removeClass('block')
            e.stopPropagation()
        })
        $(document).on('click', function () {
            $('.moreDetail').removeClass('block')
        });
        $li.find('.logo').css('background', element.bgColor)
        $li.on('click', '.modifyUrl', (e) => {
            let modifyUrl = window.prompt('请输入您更改后的链接')
            if (modifyUrl.indexOf('http') !== 0) {
                modifyUrl = 'https://' + modifyUrl
            }
            hashMap[index].url = modifyUrl
            hashMap[index].logo = simplifyUrl(modifyUrl)[0]
            render()
            e.stopPropagation()
        })

    });

}
render()
$addSite.on('click', () => {
    let url = window.prompt('请输入您要添加的网站链接')
    if (url.length === 0) {
        alert('网址不能为空')
        return
    }
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: simplifyUrl(url)[0], url: url, bgColor: randomColor() })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
const randomColor = () => {
    var colArr = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    var color = '';
    for (var i = 0; i < 6; i++) {
        var random = Math.floor(Math.random() * 16);
        color += colArr[random];
    }
    return "#" + color;
}
if ('ontouchstart' in document.documentElement) {
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, { passive: false });
}