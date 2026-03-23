import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPeview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";
type TProductModalProps = {
    isOpen : boolean;
    onClose : () => void;
    onSuccess? : ()=> void;
    product? : Product | null;
}
type ProductFromData = {
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    description: string;
}

const ProductModal = ({isOpen, onClose, onSuccess, product}: TProductModalProps) => {
        const [imageFile, setImageFile] = useState<File | null>(null);
        const [imagePreview, setImagePreview] = useState<string | null>(null);
        const [categories, setCategories] = useState<Category[]>([]);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [fromData, setFromData] = useState<ProductFromData>({
            name: "",
            price: 0,
            stock: 0,
            categoryId: "",
            description: "",
        });
        const isEditMode = !!product;
        const fetchCategories = async () => {
            try{
                const data = await getAllCategories();
                setCategories(data);
            }
            catch(error){
                console.error("Failed to fetch categories", error);
            }
        }
        const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const {id, value} = e.target;
            setFromData((prev)=> ({...prev, [id]: value}));
        };
        const handleSubmit = async(e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            try{
                const data = new FormData();
                data.append("name", fromData.name);
                data.append("price", fromData.price.toString());
                data.append("stock", fromData.stock.toString());
                data.append("categoryId", fromData.categoryId);
                data.append("description", fromData.description);
                if(imageFile){
                    data.append("image", imageFile)
                }
                if(isEditMode){
                    await updateProduct(product._id, data);
                }
                else{
                    await createProduct(data);
                }
                //Reset Form Data
                setFromData({
                    name: "",
                    price: 0,
                    stock: 0,
                    categoryId: "",
                    description: "",
                });
                setImageFile(null);
                setImagePreview(null);

                toast.success(isEditMode? "Product update successfuly!": "Product create successfuly!")

                onSuccess?.();
                onClose?.();

            }catch(error){
                console.error(isEditMode? "Failed to update product": "Failed to create product", error);
                toast.error(isEditMode? "Failed to update product": "Failed to create product");
            }finally{
                setIsSubmitting(false);
            }
        };
        useEffect (()=>{
            if(isEditMode && isOpen){
                setFromData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    categoryId: product.category._id,
                    stock: product.stock,
                });
                setImagePreview(product.imageUrl? getImageUrl(product.imageUrl): null)
            }
            else if(isOpen){
                setFromData({
                    name: "",
                    price: 0,
                    stock: 0,
                    categoryId: "",
                    description: "",
                });
                setImageFile(null);
                setImagePreview(null);
            }
        }, [isOpen, product]);

        useEffect (()=>{
            fetchCategories();
        },[])
    return(
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode? "Edit Product": "Add New Product"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="min-w-50">
                        
                        <ImageUploadPeview label="Product Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }/>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" id="name" name="name" value={fromData.name} onChange={handleChange} placeholder="e. g. Running Shoes"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div className="input-group-admin">
                            <label htmlFor="price">Price (IDR)</label>
                            <input type="number" id="price" name="price" value={fromData.price} onChange={handleChange} placeholder="e. g. 500000"/>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="stock">Stock</label>
                            <input type="number" id="stock" name="stock" value={fromData.stock} onChange={handleChange} placeholder="e. g. 100"/>
                        </div>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="categoryId">Category</label>
                            <select name="categoryId" id="categoryId" value={fromData.categoryId} onChange={handleChange}>
                                <option value="" disabled>Select Category</option>
                                {
                                    categories.map((category)=>(
                                        <option value={category._id} key={category._id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group-admin">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows={7} value={fromData.description} onChange={handleChange} placeholder="Product Details..."></textarea>
                </div>
                <Button className="ml-auto mt-3 rounded-lg" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    {
                        isEditMode? "Update Product":"Create Product"
                    }
                </Button>
            </form>
        </Modal>
    )
}
export default ProductModal;