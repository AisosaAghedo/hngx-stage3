import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Form, Nav } from "react-bootstrap";
import Navigation from "../component/navbar";
import "../App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "../component/loader";


const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleRequest() {
    const ACCESS_KEY = "ONg9VmwNhVnjB7PcKvyQaAfmyu1iBhUOYjBjstr-210";
    try {
      const response = await axios.get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          per_page: 20,
        },
      });
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
  };

  const filteredImages = images.filter((image) =>
    image.user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Container fluid >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navigation />
            <Row className="mb-4 justify-content-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search by description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </Col>
            </Row>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="gallery" direction="horizontal">
                {(provided) => (
                  <Row
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="gallery-row"
                  >
                    {filteredImages.map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Col
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            xs={6}
                            sm={4}
                            md={4}
                            lg={3}
                            className={`gallery-col ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <Card id="gallery-card">
                              <Card.Img
                                variant="top"
                                src={image.urls.regular}
                                alt={image.alt_description}
                                className="card-image"
                              />
                              <Card.Body>
                                <Card.Title id="card-para">
                                  {image.user.first_name}
                                </Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Row>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </Container>
    </>
  );
};
  


export default Gallery;
