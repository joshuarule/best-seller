function handleize(a){return a.replace(/\s+/g,"-").replace(/[^a-zA-Z-]/g,"").toLowerCase()}function toLowerCase(a){return a.toLowerCase().charAt(0).toUpperCase()+a.slice(1)}function toTitleCase(a){return a.replace(/\w\S*/g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()})}function convertTitle(a){return a=toLowerCase(a),a=toTitleCase(a)}equalheight=function(a){console.log("bang");var b,c=0,d=0,e=new Array;$(a).each(function(){if(b=$(this),$(b).height("auto"),topPostion=b.position().top,d!=topPostion){for(currentDiv=0;currentDiv<e.length;currentDiv++)e[currentDiv].height(c);e.length=0,d=topPostion,c=b.height(),e.push(b)}else e.push(b),c=c<b.height()?b.height():c;for(currentDiv=0;currentDiv<e.length;currentDiv++)e[currentDiv].height(c)})};var selection=handleize("Combined Print and E-Book Fiction");$.ajax({type:"GET",url:"http://api.nytimes.com/svc/books/v3/lists/names.jsonp?callback=foo&api-key=df18c19df02bec07cf184dba193e6d29%3A17%3A68861996",dataType:"jsonp",success:function(a){var b,c,d,e;for(list=a.results,b=0,c=list.length,b;c>b;b+=1)e=list[b].display_name,d=handleize(list[b].list_name),$("#category").append("<option value='"+d+"'>"+e+"</option>")}});var populate=function(a){$.ajax({type:"GET",url:"http://api.nytimes.com/svc/books/v3/lists/"+a+".jsonp?callback=foo&api-key=df18c19df02bec07cf184dba193e6d29:17:68861996",dataType:"jsonp",success:function(a){var b,c,d,e,f,g,h,i,j=$(".booklist");for(j.empty(),b=a.results.books,i=b.length,h=0;i>h;h+=1)e=b[h].title,e=convertTitle(e),c=b[h].rank,d=b[h].book_image,f="http://www.amazon.com/gp/product/"+b[h].primary_isbn10,g=b[h].description,$(".booklist").append("<li><span class='rank'>"+c+"</span><img class='book-image' style='background-image: url("+d+")'><div class='info'><h2>"+e+"</h2><p class='details'>"+g+"</p><a class='purchase' href='"+f+"' target='_blank'>Amazon</a></div><div class='cf'></div></li>");equalheight(".booklist li")}})};$(document).ready(function(){populate(selection),$(window).resize(function(){equalheight(".booklist li")}),$("#category").change(function(){selection=this.options[this.selectedIndex].value,populate(selection)})});