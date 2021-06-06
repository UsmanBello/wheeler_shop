const concatProductNames =(list) =>{
    var outOfStockProductsNames=''
				for(let i=0; i<list.length; i++){
						if(i===0){
							outOfStockProductsNames+=`${list[i]}`
						}else if( i===list.length-1 && list.length>1){
							outOfStockProductsNames+=`, and ${list[i]}`
						}else{
						outOfStockProductsNames+=`, ${list[i]}`
						}
				}
    return outOfStockProductsNames;
}

module.exports= { concatProductNames }