(function($){
    //列数，column
    //每一个item的定位如何确定
    //left根据所在列来确定（item的宽度+水平间距）*列数
    //top根据最短的那一列来确定，第一行除外，最短的那一列的高+垂直间距
    $.fn.watefull = function(){
        var column = 5;//一共5列
        var $this =this;//瀑布流的容器
        var total = $this.width();//容器的宽度；
        var itemArr = $this.children();//子元素
        var width = itemArr.width();//子元素的宽度；
        var space = (total-width*column)/column-1
        console.log($this);
        // console.log(total);
        console.log(itemArr);
        // console.log(width)
          var arr=[]
        itemArr.each(function(index,dom){//遍历itemArr。给每个item定位
            if(index<column){//第一行图片
                $(dom).css({
                    top:0,
                    left:index*(width+space)
                })
              
                arr[index]=$(dom).height()
            }else{
            //每行top= 最短的一列的高度+垂直的间距
            //先求出最短的那一列；
            var minIndex = 0 ;
            var min=arr[minIndex];
            // console.log(min)
            for (var i=0;i<arr.length;i++){
                if(arr[i]<min){
                    minIndex = i;
                    min=arr[minIndex]
                }
            }
            // console.log(min)
            // console.log(minIndex)
                  $(dom).css({
                top:min+10,
                left:minIndex*(width+space)
            })
            arr[minIndex]=arr[minIndex]+$(dom).height()+10;
            }
            // console.log(min)
            // console.log($(dom).height())
        
        })
        //给容器一个高度
        var max = Math.max.apply(null,arr);
        $this.height(max)
    }
    

})($)