const categories = [
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/e99a4ccc-16c0-4aee-b225-9806d5ab3250___74fbfe6fd680fd01384c278c72143188.jpg',
    alt: 'Dog category',
    label: 'Dog',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/9f2f22b1-f463-4984-97fe-9b6c7b73139f___bf6ec318bdfca3e7045dff24cb6bbf74.jpg',
    alt: 'Cat category',
    label: 'Cat',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/1a91545b-cdd6-4ea3-bab3-1d72240e72aa___6b22f39aa40b1fa583ee7956e85c8732.jpg',
    alt: 'Fish category',
    label: 'Fish',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/1e58e360-5800-4955-a363-db975e35dbbd___f84f28ed56d8db27f8209eedae071fae.jpg',
    alt: 'Birds category',
    label: 'Birds',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/06f66c82-7997-4168-bf20-dc0f08ce54fa___6aa3f303d5f44283f8fd33a9f1a014bf.jpg',
    alt: 'Turtles category',
    label: 'Turtles',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/3638d42f-f748-4223-8885-5d9c53442aaa___89705bd797fc4b72e001799c8f2973e9.jpg',
    alt: 'Reptiles category',
    label: 'Reptiles',
  },
  {
    src: 'https://arcaplanet.vtexassets.com/assets/vtex.file-manager-graphql/images/3dfd5a2f-d86f-4111-81c7-de2225ff2822___c5c6b1341c847b1aecff9d9577ba6400.jpg',
    alt: 'Rodents category',
    label: 'Rodents',
  },
];

function Categories() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="flex flex-row gap-x-5 overflow-x-auto">
        {categories.map(({ src, alt, label }, index) => (
          <button className="flex flex-col flex-grow gap-y-1" key={index}>
            <img className="w-36 mx-auto" src={src} alt={alt} />
            <p className="text-base font-semibold">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
