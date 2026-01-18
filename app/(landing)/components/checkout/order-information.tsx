"use client";

import React, { useState } from "react";
import CardWithHeader from "../ui/card-with-heder";
import { CustomerInfo } from "@/app/hooks/use-card-store";

type TOrderInformation = {
    formData: CustomerInfo;
    setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>
}
const OrderInformation = ({formData, setFormData}: TOrderInformation) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return(
        <CardWithHeader title="Order Information">
            <div className="p-5">
                <div className="input-group">
                    <label htmlFor="full_name">Full Name</label>
                <input type="text" placeholder="Type your full name" id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="wa_numbe">Whatsapp Number</label>
                <input type="number" placeholder="Type your full whatsapp number" id="customerContact" name="customerContact" value={formData.customerContact!} onChange={handleInputChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="customerAdress">Shipping Adress</label>
                <textarea placeholder="Type your full shipping adress" id="customerAdress" name="customerAddress" rows={7} value={formData.customerAddress} onChange={handleInputChange}/>
                </div>
            </div>
        </CardWithHeader>
    )
}
export default OrderInformation;