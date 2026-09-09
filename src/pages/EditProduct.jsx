import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/products/${id}`);
        if (res.data.success) {
          const product = res.data.data;
          setTitle(product.title || '');
          setDescription(product.description || '');
          setPrice(product.price || '');
          setRating(product.rating || '');
          setReview(product.review || '');
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('review', review);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        toast.success("Product updated successfully!");
        navigate('/products');
      }
    } catch (error) {
      console.error("Error in updating product:", error);
      toast.error("Error updating product");
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
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Update Product</h2>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Product Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-3 py-2"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rounded-3"
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="fw-semibold">Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="rounded-3 py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="fw-semibold">Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rounded-3 py-2"
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Review</Form.Label>
            <Form.Control
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="rounded-3 py-2"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Update Product Image (Optional)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="rounded-3 py-2"
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 py-2 rounded-3 fw-bold shadow-sm">
            Update Product
          </Button>
        </Form>
      </div>
    </div>
  );
}