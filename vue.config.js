module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/scss/variables.scss";\
                              @import "~@/assets/scss/mixin.scss";`
            }
        }
    }
}
