import "./resumeGenerator.css";
import { Modal, Button, Card, Row, Col, Typography, Space, message, Tag } from "antd";
import {
  DiffOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  StarOutlined,
  CrownOutlined,
  RocketOutlined,
  BookOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { useState } from "react";
import BasicResume from "./resumesDesign/BasicResume";
import Modern from "./resumesDesign/ModernResume";
import SleekResume from "./resumesDesign/SleekResume";
import ClassicResume from "./resumesDesign/ClassicResume";
import ExecutiveResume from "./resumesDesign/ExecutiveResume";
import MinimalistResume from "./resumesDesign/MinimalistResume";

const { Title, Text } = Typography;
const { Meta } = Card;

const ResumeGenerator = ({ resumeInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);

  const resumeDesigns = [
    {
      name: "basic",
      title: "Professional Classic",
      icon: <BookOutlined />,
      preview: "📄",
      description: "Timeless and trustworthy design that employers have relied on for decades. Perfect for traditional industries like finance, law, and government.",
      features: ["ATS-friendly", "Professional layout", "Clean typography", "Widely accepted"],
      bestFor: "Traditional careers",
      popular: false,
      component: (info) => <BasicResume resumeInfo={info} />,
    },
    {
      name: "modern",
      title: "Modern Creative",
      icon: <RocketOutlined />,
      preview: "🚀",
      description: "Contemporary design with innovative layouts and visual elements. Stands out in creative and tech industries.",
      features: ["Creative design", "Visual impact", "Modern aesthetics", "Eye-catching"],
      bestFor: "Tech & creative fields",
      popular: true,
      component: (info) => <Modern resumeInfo={info} />,
    },
    {
      name: "sleek",
      title: "Minimalist Elegance",
      icon: <CrownOutlined />,
      preview: "👑",
      description: "Sophisticated minimalism with clean lines and ample white space. Conveys elegance and attention to detail.",
      features: ["Minimalist design", "Clean spacing", "Elegant fonts", "Sophisticated"],
      bestFor: "Design & marketing",
      popular: false,
      component: (info) => <SleekResume resumeInfo={info} />,
    },
    {
      name: "classic",
      title: "Executive Standard",
      icon: <StarOutlined />,
      preview: "⭐",
      description: "Executive-level formatting with structured sections and professional hierarchy. Ideal for senior positions and leadership roles.",
      features: ["Executive format", "Structured layout", "Leadership focus", "Impactful"],
      bestFor: "Executive positions",
      popular: false,
      component: (info) => <ClassicResume resumeInfo={info} />,
    },
    {
      name: "executive",
      title: "Executive Professional",
      icon: <CheckCircleOutlined />,
      preview: "💼",
      description: "High-impact design focused on achievements and leadership. Excellent for senior management and corporate leaders.",
      features: ["Achievement focus", "Robust layout", "Professional blue accents", "Impactful sections"],
      bestFor: "Senior Management",
      popular: false,
      component: (info) => <ExecutiveResume resumeInfo={info} />,
    },
    {
      name: "minimalist",
      title: "Clean Minimalist",
      icon: <EyeOutlined />,
      preview: "✨",
      description: "Ultra-clean design that focuses purely on content. Removes all distractions for a direct and honest presentation.",
      features: ["Ultra-clean", "Max readability", "Modern spacing", "Direct focus"],
      bestFor: "Creative & Junior roles",
      popular: false,
      component: (info) => <MinimalistResume resumeInfo={info} />,
    },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectDesign = (index) => {
    setSelectedDesignIndex(index);
    setIsModalOpen(false);
    message.success(`Switched to ${resumeDesigns[index].title} design`);
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const handleGeneratePDF = () => {
    try {
      // Import the PDF generation function dynamically
      import("generate-pdf-from-react-html").then(({ pdfFromReact }) => {
        pdfFromReact(".resume", "my-resume", "p", true, true);
        message.success("PDF generated successfully!");
      }).catch((error) => {
        console.error("Error generating PDF:", error);
        message.error("Failed to generate PDF. Please try again.");
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Failed to generate PDF. Please try again.");
    }
  };

  const currentDesign = resumeDesigns[selectedDesignIndex];

  return (
    <div className="resume-generator-container">
      {/* Design Selection Modal */}
      <Modal
        title={
          <div className="modal-header-content">
            <div className="modal-title-section">
              <DiffOutlined className="modal-icon" />
              <div>
                <Title level={4} className="modal-title">Choose Your Resume Design</Title>
                <Text type="secondary" className="modal-subtitle">
                  Select a design that matches your career level and industry
                </Text>
              </div>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={toggleModal}
        footer={
          <div className="modal-footer">
            <Space>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                💡 Tip: Choose a design that reflects your industry and experience level
              </Text>
              <Button onClick={toggleModal}>Cancel</Button>
            </Space>
          </div>
        }
        width={1100}
        centered
        className="design-selection-modal"
        bodyStyle={{ padding: '24px 32px' }}
      >
        <div className="designs-intro">
          <Text className="designs-intro-text">
            Transform your resume with professionally designed templates that make you stand out.
            Each design is optimized for readability and impact.
          </Text>
        </div>

        <Row gutter={[32, 32]} className="designs-grid">
          {resumeDesigns.map((design, index) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={6} key={index}>
              <Card
                className={`design-card ${selectedDesignIndex === index ? 'selected' : ''} ${design.popular ? 'popular' : ''}`}
                hoverable
                onClick={() => handleSelectDesign(index)}
                cover={
                  <div className="design-card-cover">
                    <div className="design-preview">
                      <div className="preview-icon">{design.preview}</div>
                      <div className="preview-label">{design.title}</div>
                    </div>
                    {design.popular && (
                      <Tag color="gold" className="popular-tag">
                        <StarOutlined /> Most Popular
                      </Tag>
                    )}
                    {selectedDesignIndex === index && (
                      <div className="selected-indicator">
                        <CheckCircleOutlined />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>
                }
              >
                <div className="design-card-content">
                  <div className="design-header">
                    <Title level={5} className="design-title">{design.title}</Title>
                    <Text type="secondary" className="design-best-for">
                      Best for: {design.bestFor}
                    </Text>
                  </div>

                  <Text className="design-description">
                    {design.description}
                  </Text>

                  <div className="design-features">
                    <Text strong style={{ fontSize: '12px', marginBottom: '8px', display: 'block' }}>
                      Key Features:
                    </Text>
                    <div className="features-tags">
                      {design.features.map((feature, idx) => (
                        <Tag key={idx} size="small" color="blue" className="feature-tag">
                          {feature}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <Button
                    type={selectedDesignIndex === index ? "primary" : "default"}
                    size="small"
                    className="select-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDesign(index);
                    }}
                    block
                  >
                    {selectedDesignIndex === index ? (
                      <>✓ Selected</>
                    ) : (
                      <>Select Design</>
                    )}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>

      {/* Resume Display */}
      <div className="resume-display-section">
        <div className="resume-actions-bar">
          <div className="current-design-info">
            <Space>
              <span className="design-icon">{currentDesign.icon}</span>
              <div>
                <Text strong>{currentDesign.title} Design</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {currentDesign.description}
                </Text>
              </div>
            </Space>
          </div>
          <Space>
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={handlePreview}
            >
              Preview
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleGeneratePDF}
            >
              Generate PDF
            </Button>
            <Button
              type="default"
              icon={<DiffOutlined />}
              onClick={toggleModal}
            >
              Change Design
            </Button>
          </Space>
        </div>

        <div className="resume-content resume">
          {resumeDesigns[selectedDesignIndex].component ?
            resumeDesigns[selectedDesignIndex].component(resumeInfo) :
            <div className="loading-placeholder">Loading resume...</div>
          }
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        title={
          <div className="preview-modal-header">
            <EyeOutlined />
            <span>Resume Preview - {currentDesign.title}</span>
          </div>
        }
        open={isPreviewModalOpen}
        onCancel={() => setIsPreviewModalOpen(false)}
        width={1000}
        centered
        footer={[
          <Button key="close" onClick={() => setIsPreviewModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleGeneratePDF}
          >
            Download PDF
          </Button>,
        ]}
        className="resume-preview-modal"
      >
        <div className="preview-container">
          <div className="preview-page">
            <div className="resume-content preview-mode">
              {resumeDesigns[selectedDesignIndex].component ?
                resumeDesigns[selectedDesignIndex].component(resumeInfo) :
                <div className="loading-placeholder">Loading resume...</div>
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResumeGenerator;
