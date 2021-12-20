import styled from 'styled-components';

export const SwiperContainer = styled.div`
    display: block;
    margin: 20px auto;
    .swiper-slide {
        display: block;
        box-sizing: border-box;
        min-height: 300px;
        border-radius: 5px;
        text-align: center;
        border: 1px solid #d2d2d2;
        color: #FFF;
        position: relative;
        padding-bottom: 60px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        &.selected{
            background-color: #2d6133;
        }
    }
    .swiper-pagination-bullet-active {
        background-color: #2d6133 !important;
    }
      
`;

export const SlideContent = styled.article`
    position: absolute;
    bottom: 65px;
    padding: 10px 0;
    background: #000000ad;
    width: 100%;
    min-height: 50px;
`;

export const SlideTitle = styled.div`
    display: block;
`;

export const SlideDescripcion = styled.div`
    display: block;
    font-size: 14px;
`;
