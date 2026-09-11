import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

const BACKEND_URL = 'https://full-stack-beckend.vercel.app';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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
      const res = await axios.post(`${BACKEND_URL}/api/v1/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        toast.success("Product created successfully!");
        navigate('/products');
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create New Product</h2>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
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
              placeholder="Enter product description"
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
                placeholder="0.00"
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
                placeholder="Rating"
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
              placeholder="Write a brief review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="rounded-3 py-2"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="rounded-3 py-2"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-2 rounded-3 fw-bold shadow-sm">
            Create Product
          </Button>
        </Form>
      </div>
    </div>
  );
}