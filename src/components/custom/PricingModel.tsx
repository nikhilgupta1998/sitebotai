"use client";

import Lookup from "@/data/Lookup";
import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface PriceType {
  name: string;
  tokens: string;
  value: number;
  desc: string;
  price: number;
}

function PricingModel() {
  const userContext = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState<PriceType | null>(null);

  const UpdateToken = useMutation(api.user.UpdateToken);
  useEffect(() => {
    console.log(userContext?.userDetail);
  }, [userContext?.userDetail]);

  const onPaymentSuccess = async (pric: PriceType, usr: any) => {
    console.log(selectedOption);
    console.log(pric);
    console.log(usr);
    const token = Number(usr?.token) + Number(pric?.value);
    console.log(token);
    await UpdateToken({
      token: token,
      userId: userContext?.userDetail?._id,
    });
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
      {Lookup.PRICING_OPTIONS.map((pricing: PriceType, index: number) => (
        <div
          className="flex flex-col gap-6 border rounded-xl p-10 justify-between"
          key={index}
        >
          <h2 className="font-bold text-4xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            {pricing.price}$
          </h2>
          {/* <Button>Upgrade to {pricing.name}</Button>
           */}
          {userContext?.userDetail && (
            <div
              onClick={() => {
                setSelectedOption(pricing);
                console.log(pricing);
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                disabled={!userContext?.userDetail}
                onCancel={() => console.log("payment cancel")}
                onClick={() => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                }}
                onApprove={async () => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                  let pric = pricing;
                  let usr = userContext?.userDetail;
                  onPaymentSuccess(pric, usr);
                }}
                createOrder={(data: any, actions: any) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: pricing.price,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
