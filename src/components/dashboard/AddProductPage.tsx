import { useState } from 'react'

const AddProductPage = () => {
  const [productName, setProductName] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  return (
    <div>
      <h1>Add New Product</h1>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
        />
      </div>
      <div>
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {previewImage && (
        <div>
          <h2>Preview</h2>
          <img src={previewImage} alt="Product Preview" />
        </div>
      )}
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        Save Product
      </button>
    </div>
  )
}

export default AddProductPage
