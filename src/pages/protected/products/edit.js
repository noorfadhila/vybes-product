import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import ProductService from "../../../services/products.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default function ProductEdit () {
    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const { user: currentUser } = useSelector((state) => state.auth);
    const checkBtn = useRef();
    const query = useQuery();
    const history = useNavigate();
    const form = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [productname, setProductname] = useState("");
    const [qty, setQty] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        ProductService.getProductId(query.get('id')).then(
            (res) => {
                const data = res.data;
                setProductname(data.productname);
                setQty(data.qty);
                setNotes(data.notes);
                setIsEdit(true);
            }
        ).catch((error) =>{
            console.log(error)
        })
    }, [query]);

    const onChangeProductname = (e) => {
        const productname = e.target.value;
        setProductname(productname);
    };

    const onChangeQty = (e) => {
        const qty = e.target.value;
        setQty(qty);
    };

    const onChangeNotes = (e) => {
        const notes = e.target.value;
        setNotes(notes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkBtn.current.context._errors.length === 0) {
            if(isEdit === false){
                ProductService.createProduct(productname, qty, notes).then(
                    (response) => {
                    console.log("berhasil");
                    history("/product/list");
                    },
                    (error) => {
                    console.log("gagal")
                    }
                );
            }else{
                ProductService.editProduct(query.get("id"), productname, qty, notes).then(
                    (response) => {
                    console.log("berhasil");
                    history("/product/list");
                    },
                    (error) => {
                    console.log("gagal")
                    }
                );
            }
        }
        
    }
    return (
        
        <>
            {currentUser ? 
                <div className="row">
                    <div className="col-12 my-3 d-flex justify-content-between">
                        <h3>Tambah/Edit Produk</h3>
                    </div>
                    <Form onSubmit={handleSubmit} ref={form}>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Nama Produk</label>
                            <Input
                                    type="text"
                                    className="form-control"
                                    name="productname"
                                    value={productname}
                                    onChange={onChangeProductname}
                                    validations={[required]}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputPassword1">Jumlah Produk</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="qty"
                                value={qty}
                                onChange={onChangeQty}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputPassword1">Keterangan</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="notes"
                                value={notes}
                                onChange={onChangeNotes}
                                validations={[required]}
                            />
                        </div>
                        <div class="d-grid gap-2 py-2 mt-2">
                        <button class="btn btn-primary" type="submit">{isEdit ? "Ubah" : "Buat"}</button>
                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            : <h1 className="text-center">Unauthorized!</h1>
            }
        </>
    )
}