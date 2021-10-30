$(function () {

    $(document).ready(function () {

        const url = {
            origin: document.location.origin,
            link: document.location.href,
        }


        if (url.link.includes('products')) {
            $.ajax({
                url: origin + '/andira-garment/assets/data/products.json',
                method: 'GET',
                success: (data) => {
                    const products = data.rows;
                    const mapped = products.map((v, i, n) => {
                        return {
                            id: v.id,
                            sku: v.sku,
                            name: v.name.toLowerCase(),
                            description: v.description,
                            regular_price: v.regular_price,
                            images: v.images,
                        }
                    })

                    const container = $('.products-container');
                    const card = (product) => {
                        return `
                        <div class="col-12 col-sm-6 col-md-3 col-lg-4 mb-3">
                            <div class="card">
                                <img src="${product.images}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                    <h5 class="card-title text-capitalize">${product.name}</h5>
                                    <p class="card-text" style="height: 3rem; overflow: hidden;">${product.description}</p>
                                    <a href="./product-detail.html?id=${product.id}" class="btn btn-primary btn-block">Beli Produk</a>
                                </div>
                            </div>
                        </div>
                        `
                    }

                    let productsHtml = [];

                    mapped.forEach((v, i) => {
                        productsHtml.push(card(v))
                    })

                    $(container).html(productsHtml)
                }
            })
        }

        if (url.link.includes('product-detail')) {
            $.ajax({
                url: origin + '/andira-garment/assets/data/products.json',
                method: 'GET',
                success: (data) => {
                    const products = data.rows;
                    const mapped = products.map((v, i, n) => {
                        return {
                            id: v.id,
                            sku: v.sku,
                            name: v.name.toLowerCase(),
                            description: v.description,
                            regular_price: v.regular_price,
                            images: v.images,
                        }
                    })

                    const container = $('.products-container');
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const id = urlParams.get('id')


                    const card = (product) => {
                        if (product.id == id) {
                            return `
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 col-md-4 mb-3">
                                            <img src="${product.images}" class="card-img-top" alt="${product.name}">
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-8 mb-3">
                                            <h5 class="card-title text-capitalize">${product.name}</h5>
                                            <p class="card-text mb-5">${product.description}</p>
                                            <a href="https://wa.me/6282233435843?text=Saya+mau+beli+produk+ini%0D%0A${document.location.href}"
                                            class="btn btn-primary"> Beli Produk </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        }
                    }

                    let productsHtml = [];

                    mapped.forEach((v, i) => {
                        productsHtml.push(card(v))
                        $('meta[property="og:title"]').attr('content', v.name)
                        $('meta[property="og:description"]').attr('content', v.description)
                        $('meta[property="og:image"]').attr('content', v.images)
                    })

                    $(container).html(productsHtml)
                }
            })
        }


    })

})