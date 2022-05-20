import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../services/products.service";

export default function ProductList () {
    const history = useNavigate();
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        ProductService.getProductList().then(
          (response) => {
            console.log(response.data);
            let listProduct = [];
            // setProducts(response.data);
            for (let key in response.data){
                listProduct.push({
                    ...response.data[key],
                    id: key
                })
            }
            setProducts(listProduct)
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            setProducts(_content);
          }
        );
    }, []);

    const detailHandler = (id) => {
        history("/product/edit?id=" + id);
    }

    const deleteHandler = (id) => {
        ProductService.deleteProduct(id).then((response) => {
            window.location.reload();
        })
    }

    console.log("products", products)

    return(
        <>
            <div className="row">
            <div className="col-12 m-3 d-flex justify-content-between">
                <h3>List Produk</h3>
                <a href="/product/edit" className="btn btn-success">Tambah Produk</a>
            </div>
            </div>
            <div className="row">
                <div className="col-12 m-3">
                    <div className="table-responsive-sm">
                
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Keterangan</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length ? 
                                    products.map((prod, i) => (
                                        <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td>{prod.productname}</td>
                                        <td>{prod.qty}</td>
                                        <td>{prod.notes}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm mx-1" onClick={() =>detailHandler(prod.id)} >Edit</button>
                                            <button className="btn btn-danger btn-sm mx-1" onClick={() =>deleteHandler(prod.id)} >Hapus</button>
                                        </td>
                                        </tr>
                                    ))
                                : <p>no</p>}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}