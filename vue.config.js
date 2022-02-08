module.exports = {
    //esta linea se pone para desactivar eslint si es que se instalo y ya no se desea
    lintOnSave: false,
    //publicPath cuando se requiera hacer build del proyecto tomara la ruta de /divisas 
    //si se requiere que se llame de otra forma cambiar por el nombre deseado, 
    //la carpeta contenedora tambien debera llamarse asi, la otra ruta sera para el 
    //modo en el que estamos actualmente de preferencia dejarla vacia solo con /
    publicPath: process.env.NODE_ENV === 'production' ? '/tutorial' : '/',
    transpileDependencies: [
      'vuetify'
    ]
  }
