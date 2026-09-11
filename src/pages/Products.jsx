import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';

const BACKEND_URL = 'https://full-stack-beckend.vercel.app';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/products`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/products/${id}`);
      if (res.data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Product List</h2>
        <Link to="/create" className="btn btn-primary shadow-sm px-4">
          + Create New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h4>No products found.</h4>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-4 col-sm-6" key={product._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                {product.image ? (
                  <Card.Img
                    variant="top"
                    // Cloudinary ka URL direct aayega, is liye extra path ki zaroorat nahi
                    src={product.image.startsWith("http") ? product.image : `${BACKEND_URL}/${product.image}`}
                    style={{ height: "220px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/220?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ height: "220px" }}>
                    No Image Available
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{product.title}</h5>
                  <p className="card-text text-secondary small mb-2">{product.description}</p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-success fs-6">Price: ${product.price}</span>
                      <span className="text-warning small fw-bold">★ {product.rating || 'N/A'}</span>
                    </div>
                    {product.review && (
                      <p className="text-muted small fst-italic mb-3">"{product.review}"</p>
                    )}
                    
                    <div className="d-flex gap-2">
                      <Link to={`/products/edit/${product._id}`} className="btn btn-outline-primary btn-sm w-50">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-outline-danger btn-sm w-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}