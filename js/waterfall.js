/*封装一个瀑布流插件*/
(function($){
    $.fn.WaterFall = function(){
        /*把当前盒子下面的所有的子元素初始化成瀑布流的布局*/
        /*瀑布流容器*/
        var $this = $(this);

        var parentWidth = $this.width();

        /*瀑布流容器当中的item*/
        var items = $this.children();

        var childWidth = items.width();

        /*多少列*/
        var columnCount = 5;

        /*间距*/
        var space = (parentWidth - childWidth * columnCount)/(columnCount-1);

        /*需要记录高度的变化  每一列的高度的变化*/
        var columnArray = [];

        /*遍历items盒子*/

        items.each(function(index,obj){
            /*当前的遍历到对象*/
            var $obj = $(obj);
            var height = $obj.height();

            /*第一列有点特殊  所有的top都是0  当前还是没有高度columnArray*/
            if(index < columnCount){
                columnArray[index] = height;
                /*针对每一个盒子设置定位*/
                $obj.css({top:0,left:index*(childWidth+space)});
            }
            /*正常情况下*/
            else{
                /*每一次都需要追加到最矮的那一列*/
                /*怎么样找到最矮的那一列？？？*/
                /*假设  我们先的第一个数据就是  最矮的*/
                var min = columnArray[0];
                var min_index = 0;
                for(var i = 0 ; i < columnArray.length ; i ++){
                    if( min > columnArray[i]){
                        min = columnArray[i];
                        min_index = i;
                    }
                }

                /*当我们加一个盒子之后  我们要跟新当前列的高度*/
                columnArray[min_index] += height +10;

                /*算定位*/
                $obj.css({
                    top: min + 10,
                    left:min_index*(childWidth+space)
                });

                /*min_index  就是你去追加的那一个列的索引*/

            }
            console.log("当前每一列的高度："+columnArray);
        });

        /*最后来设置瀑布流容器的高度*/
        /*获取最高的那一列*/
        var max = columnArray[0];
        for(var j = 0;j<columnArray.length;j++){
            if(max < columnArray[j]){
                max = columnArray[j];
            }
        }
        $this.height(max);
    }
})(jQuery);
