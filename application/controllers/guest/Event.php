<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Event extends CI_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model("admin/Event_model", "EventModel");
    }

    function index()
    {
        $Title = ['title'=>"Event Wisata"];
        $data['event'] = $this->EventModel->eventonly();
        $this->load->view('guest/header', $Title);
        $this->load->view('guest/event', $data);
        $this->load->view('guest/footer');
    }

    function readevent($id)
    {
        $Title = ['title'=>"Event Wisata"];
        $data['event'] = $this->EventModel->selectone($id);
        $this->load->view('guest/header', $Title);
        $this->load->view('guest/readevent', $data);
        $this->load->view('guest/footer');

    }

    public function getData($id=null)
    {
        $data['user'] = $this->session->userdata('user_data');
        $data['event'] = $this->EventModel->selectone($id)[0];
        echo json_encode($data);
    }

    public function getDataEvent()
    {
        $data['user'] = $this->session->userdata('user_data');
        $data['event'] = $this->EventModel->selectevent();
        echo json_encode($data);
    }
    
}