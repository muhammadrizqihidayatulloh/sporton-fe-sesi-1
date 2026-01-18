"use client";

import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-card-store";
import React from "react";

const productsList = [
    {
        name: "SportsOn Hyperfast Shoes",
        category: "Running",
        price: 329000,
        imgUrl: "product-3.svg"
    },
    {
        name: "SportsOn Rockets Tennis",
        category: "Tennis",
        price: 999000,
        imgUrl: "product-2.svg"
    },
    {
        name: "SportsOn Slowlivin",
        category: "Running",
        price: 119000,
        imgUrl: "product-1.svg"
    },

    {
        name: "SportsOn HyperSoccer v2",
        category: "Football",
        price: 458000,
        imgUrl: "product-4.svg"
    },
    {
        name: "SportsOn HyperSoccer v2",
        category: "Football",
        price: 458000,
        imgUrl: "product-4.svg"
    },
    {
        name: "SportsOn Slowlivin",
        category: "Running",
        price: 119000,
        imgUrl: "product-5.svg"
    },
    {
        name: "SportsOn Hyperfast Shoes",
        category: "Running",
        price: 329000,
        imgUrl: "product-7.svg"
    },
    {
        name: "SportsOn Rockets Basketball",
        category: "Basketball",
        price: 599000,
        imgUrl: "product-6.svg"
    }
]
type TProductsProps = {
    products : Product[]
}

const ProductsSection = ({products}: TProductsProps) => {
const {addItem} = useCartStore();
const handleAddtoCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
}

    return (
        <section id = "products-sections" className="container mx-auto mt-32 pl-25 pr-25 mb-52">
            <h2 className="font-bold italic text-4xl text-center mb-11">
                <span className="text-primary">OUR </span>Products
            </h2>
            <div className="grid grid-cols-4 gap-5">
                {
                    products.map((product) => (
                    <Link href={`/product/${product._id}`} key={product._id} className="p-1.5 bg-white hover:drop-shadow-xl duration-300">
                    <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
                        <Image src={getImageUrl(product.imageUrl)} alt={product.name} width={300} height={300} className="aspect-square object-contaier" />
                        <Button className="w-10 h-10 p-2! absolute right-3 top-3" onClick={(e) => handleAddtoCart(e, product)}>
                            <FiPlus size={24}/>
                        </Button>
                    </div>
                    <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
                    <div className="flex justify-between mb-8">
                        <div className="text-gray-500">{product.category.name}</div>
                        <div className="font-medium text-primary">
                            {priceFormatter(product.price)
                            }</div>
                    </div>
                    </Link>
                ))
                }
            </div>
        </section>
    )
}

export default ProductsSection;