import { ShieldCheck, Truck, Headphones } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Shopix?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience secure shopping, lightning-fast delivery, and
            customer support that is always ready to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-blue-600" />
            </div>

            <h3 className="text-xl font-bold mt-6">
              Secure Payments
            </h3>

            <p className="text-gray-600 mt-3">
              100% secure transactions with trusted payment gateways and
              advanced encryption.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Truck className="h-7 w-7 text-purple-600" />
            </div>

            <h3 className="text-xl font-bold mt-6">
              Fast Delivery
            </h3>

            <p className="text-gray-600 mt-3">
              Get your favorite products delivered quickly and safely to
              your doorstep.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
              <Headphones className="h-7 w-7 text-pink-600" />
            </div>

            <h3 className="text-xl font-bold mt-6">
              24/7 Support
            </h3>

            <p className="text-gray-600 mt-3">
              Our dedicated support team is available anytime to assist
              you with your shopping experience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;