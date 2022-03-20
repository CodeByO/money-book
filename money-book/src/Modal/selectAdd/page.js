import React, { useEffect, useState } from "react";
import {Modal,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './design.css';
function SelectAdd(){
    const [lgShow, setLgShow] = useState(false);
    return(
        <div>
      <Button onClick={() => setLgShow(true)}>추가하기</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            추가할 카테고리
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Link to={"/post/category/main"}>메인 카테고리</Link>
        </Modal.Body>
        <Modal.Body>

            <Link to={"/post/category/sub"}>서브 카테고리</Link>
        </Modal.Body>
        <Modal.Body>

        <Link to={"/post/payment/main"}>메인 결제수단</Link>
        </Modal.Body>
        <Modal.Body>

        <Link to={"/post/payment/sub"}>서브 결제수단</Link>
        </Modal.Body>
      </Modal>
        </div>
    );
}

export default SelectAdd;