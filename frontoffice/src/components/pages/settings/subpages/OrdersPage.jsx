import { CheckIcon } from '@heroicons/react/20/solid';

import orders from '../../shop/products.json';

function OrdersPage() {
  return (
    <div className="bg-white">
      <div className="mt-4 space-y-16 ">
        <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
          <ul className="grid grid-cols-1  auto-rows-auto divide-y divide-gray-200 sm:-my-10">
            {orders.data.map((product) => (
              <li key={product.id} className="flex py-6 sm:py-10">
                <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                  <div className="lg:flex-1">
                    <div className="sm:flex">
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="sm:hidden mt-2 text-sm text-gray-500 sm:block">
                          {product.description}
                        </p>
                      </div>
                      <p className="mt-1 font-medium text-gray-900 sm:mt-0 sm:ml-6">
                        {'€' + product.price}
                      </p>
                    </div>
                    <div className="mt-2 flex text-sm font-medium sm:mt-4">
                      <a href={product.href} className="text-indigo-600 hover:text-indigo-500">
                        View Product
                      </a>
                    </div>
                  </div>
                  <div className="mt-6 font-medium">
                    <div className="flex flex-row space-x-2">
                      <p>
                        Delivered
                        <span className="hidden sm:inline">
                          {' '}
                          on <time dateTime={'2021/05/12'}>2021/05/12</time>
                        </span>
                      </p>
                      <CheckIcon className="flex-none w-6 h-6 text-green-500" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0 sm:m-0 sm:mr-6 sm:order-first">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-52 lg:h-52"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export { OrdersPage };
