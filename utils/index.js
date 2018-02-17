var d = new Date();

module.exports = {
    
    lz: function(num){
      return (num < 10 ? '0' : '') + num;
    },

    nowDate: function(){
      return  d.getFullYear() + "-" + this.lz(d.getMonth()+1) + "-" + this.lz(d.getDate());
    },
    
    nowTime: function(){
      return  this.lz(d.getHours()) + ":" + this.lz(d.getMinutes());
    },

    arrayUpper: function(obj){
      return obj.map(function(x){ return x.toUpperCase() })
    },
    
    arrayClean: function(obj){
        var res = {};
      
        if( Object.prototype.toString.call(obj) === '[object Object]' ) {
          for (var key in obj) {
            res[key] = this.arrayClean(obj[key]);
          }
        } else if( Object.prototype.toString.call(obj) === '[object Array]' ) {
          if (obj.length === 1) {
            res = this.arrayClean(obj[0]);
          } else {
            res = new Array;
            for(var i=0;i<obj.length;i++) {
              res.push(this.arrayClean(obj[i]));
            }
          }
        } else {
          res = obj;
        }
        return res;
    }
}
