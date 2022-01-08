const db = require('../connection');
const express = require('express');
const bcrypt = require('bcrypt');

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {};

// UPDATE ADMIN - add message after successful updating admin account
exports.updateAdmin = async (req, res) => {
   const adminId = req.params.adminId;
};
