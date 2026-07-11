import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({ ngày: 0, giờ: 0, phút: 0, giây: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-08-18T08:00:00');

    const timer = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          ngày: Math.floor(difference / (1000 * 60 * 60 * 24)),
          giờ: Math.floor((difference / (1000 * 60 * 60)) % 24),
          phút: Math.floor((difference / 1000 / 60) % 60),
          giây: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderCalendar = () => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    // August 2026 starts on Saturday (index 6)
    const blanks = Array(6).fill(null); 
    const monthDays = Array.from({length: 31}, (_, i) => i + 1);
    const totalSlots = [...blanks, ...monthDays];

    return (
      <div className="calendar">
        <div className="calendar-header">THÁNG 8 . 2026</div>
        <div className="calendar-grid">
          {days.map(d => <div key={d} className="cal-day-name">{d}</div>)}
          {totalSlots.map((d, i) => (
            <div key={i} className={`cal-day ${d === 18 ? 'highlight' : ''} ${!d ? 'empty' : ''}`}>
              {d || ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Generate random hearts
  const hearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + 'vw',
    animationDuration: Math.random() * 4 + 4 + 's', // 4s to 8s
    animationDelay: Math.random() * 5 + 's',
    fontSize: Math.random() * 1 + 0.8 + 'rem',
    emoji: ['💖', '💕', '💗', '💓', '🌸'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="page-wrapper">
      {/* Falling hearts background */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="heart" 
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.fontSize
          }}
        >
          {heart.emoji}
        </div>
      ))}

      <div className="invitation-container">
        
        <motion.div 
          className="image-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="heart-frame">
            <img src="/graduate-photo.png" alt="Graduate" />
          </div>
        </motion.div>

        <motion.div 
          className="content-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="decorative-border"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 className="top-subtitle" variants={itemVariants}>
              Đại Học Công Nghiệp Hà Nội
            </motion.h3>
            
            <motion.h1 className="main-title" variants={itemVariants}>
              Graduation
            </motion.h1>

            <motion.h2 className="graduate-name" variants={itemVariants}>
              Ngô Khắc Tài
            </motion.h2>
            
            <motion.div className="divider" variants={itemVariants}></motion.div>
            
            <motion.p className="greeting" variants={itemVariants}>
              Trân trọng kính mời gia đình và bạn bè đến chung vui cùng Tài trong ngày lễ đặc biệt này.
            </motion.p>
            
            <motion.div className="countdown-container" variants={itemVariants}>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.ngày.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Ngày</span>
              </div>
              <span className="countdown-value">:</span>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.giờ.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Giờ</span>
              </div>
              <span className="countdown-value">:</span>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.phút.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Phút</span>
              </div>
              <span className="countdown-value">:</span>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.giây.toString().padStart(2, '0')}</span>
                <span className="countdown-label">Giây</span>
              </div>
            </motion.div>

            <motion.div className="info-row" variants={itemVariants}>
              {renderCalendar()}
              
              <div className="details">
                <div className="detail-row">
                  <span className="detail-label">Thời gian</span>
                  <span className="detail-value">08:00 Sáng</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa điểm</span>
                  <span className="detail-value">Khu A, Đại Học Công Nghiệp Hà Nội</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="map-container" variants={itemVariants}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4736632151066!2d105.73252651119284!3d21.053735986838664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1783763989086!5m2!1svi!2s" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </motion.div>

            <motion.button 
              className="rsvp-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Xác Nhận Tham Dự</span>
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

export default App;
