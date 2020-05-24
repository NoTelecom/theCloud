<template>
   <v-gallery :images="list" :caption="true"></v-gallery>
</template>
 
<script>

    export default {
        data(){
            return {
                list: [
                    {title:'Image1',url:'../../static/img/img1.jpg'},
                    {title:'Image2',url:'../../static/img/img2.jpg'},
                    {title:'Image3',url:'../../static/img/img3.jpg'},
                    {title:'Image4',url:'../../static/img/video.jpg'},
                    {title:'Image5',url:'../../static/img/radio.jpg'},
                    {title:'Image6',url:'../../static/img/photo1.jpg'},
                    {title:'Image7',url:'../../static/img/classify3.jpg'},
                    {title:'Image8',url:'../../static/img/timg.gif'},
                    {title:'Image9',url:'../../static/img/classify4.jpg'},
                    {title:'Image10',url:'../../static/img/img4.jpg'},
                    {title:'Image11',url:'../../static/img/img5.jpg'},
                    {title:'Image12',url:'../../static/img/img6.jpg'},
                    {title:'Image13',url:'../../static/img/img7.jpg'},
                    {title:'Image14',url:'../../static/img/img8.jpg'},
                    {title:'Image15',url:'http://5b0988e595225.cdn.sohucs.com/images/20171223/99361a9ec3754e4194e929109a0c26f9.gif'},
                    {title:'Image16',url:'http://img.zcool.cn/community/0389a8a55deb38100000159959c89ce.jpg'},
                    {title:'Image17',url:'http://5b0988e595225.cdn.sohucs.com/images/20171221/0a8d0e6f3ade492f9bc5c6f1a539eecd.gif'},
                    {title:'Image18',url:'../../static/img/img9.jpg'},
                    {title:'Image19',url:'http://5b0988e595225.cdn.sohucs.com/images/20170929/e32a3ad908754c329bf0299e01a7cdf2.gif'},
                    {title:'Image20',url:'http://img.zcool.cn/community/037c496581ff2faa84a0d304f0c7544.gif'},
                    {title:'Image21',url:'../../static/img/img10.jpg'},
                    {title:'Image22',url:'https://f12.baidu.com/it/u=2133258779,2420437918&fm=72'},
                    {title:'Image23',url:'../../static/img/img11.jpg'},
                    {title:'Image24',url:'../../static/img/img2.jpg'},
                    {title:'Image25',url:'http://img.mp.itc.cn/upload/20170326/21ff453a07094955b31f9b1eda2f0c89_th.gif'},
                    {title:'Image26',url:'../../static/img/img19.jpg'},
                    {title:'Image27',url:'../../static/img/img13.jpg'},
                    {title:'Image28',url:'../../static/img/img17.jpg'},
                    {title:'Image29',url:'../../static/img/img20.jpg'},
                    {title:'Image30',url:'../../static/img/img1.jpg'},
                    {title:'Image31',url:'../../static/img/img4.jpg'},
                    {title:'Image32',url:'../../static/img/img5.jpg'},
                    {title:'Image33',url:'../../static/img/img10.jpg'},
                ]
            }
        }
    };
</script >
<style>
    .image-box{
        a {
            clear: both;
            display: inline-block;
            margin: 0 10px 10px 0;
            position: relative;
            text-align: center;
            .bgbox {
                background-color: #232323;
                height: 150px;
                display:table-cell;
                vertical-align:middle;
                padding: 4px;
                border-radius: 2px;
                img{ width: 200px;display: block;}
            }
            .img-title {
                bottom: 5px;
                display: block;
                text-align: center;
                color: #999999;
                padding-top: 5px;
            }
            &:hover {
                .img-title { color: #232323; }
            }
        }
    }

</style>


