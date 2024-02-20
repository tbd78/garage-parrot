const InsertQueries = require("../../db/query/insert");
const GetQueries = require("../../db/query/select");
const UpdateQueries = require("../../db/query/update");
const DeleteQueries = require("../../db/query/delete");

module.exports = {
    /** queries for car */
    carQueries: {
        Insert: InsertQueries.InsertCar,
        Get: GetQueries.GetCar,
        GetAll: GetQueries.GetAllCars,
        Update: UpdateQueries.UpdateCar,
        Delete: DeleteQueries.DeleteCar,
    },

    /** queries for car specs */
    carSpecsQueries: {
        Insert: InsertQueries.InsertCarSpec,
        Get: GetQueries.GetCarSpec,
        GetAll: GetQueries.GetAllCarSpecs,
        Update: UpdateQueries.UpdateCarSpec,
        Delete: DeleteQueries.DeleteCarSpec,
    },

    /** queries for contact info */
    contactInfoQueries: {
        Insert: InsertQueries.InsertContactInfo,
        Get: GetQueries.GetContcatInfo,
        GetAll: GetQueries.GetAllContactInfos,
        Update: UpdateQueries.UpdateContactInfo,
        Delete: DeleteQueries.DeleteContactInfo,
    },

    /** queries for feedback */
    feedbackQueries: {
        Insert: InsertQueries.InsertFeedback,
        Get: GetQueries.GetFeedback,
        GetAll: GetQueries.GetAllFeedbacks,
        Update: UpdateQueries.UpdateFeedback,
        Delete: DeleteQueries.DeleteFeedback,
    },

    /** queries for gallery */
    galleryQueries: {
        Insert: InsertQueries.InsertGallery,
        Get: GetQueries.GetGallery,
        GetAll: GetQueries.GetAllGalleries,
        Update: UpdateQueries.UpdateGallery,
        Delete: DeleteQueries.DeleteGallery,
    },

    /** queries for service */
    serviceQueries: {
        Insert: InsertQueries.InsertService,
        Get: GetQueries.GetService,
        GetAll: GetQueries.GetAllServices,
        Update: UpdateQueries.UpdateService,
        Delete: DeleteQueries.DeleteService,
    },

    /** queries for spec */
    specQueries: {
        Insert: InsertQueries.InsertSpec,
        Get: GetQueries.GetSpec,
        GetAll: GetQueries.GetAllSpecs,
        Update: UpdateQueries.UpdateSpec,
        Delete: DeleteQueries.DeleteSpec,
    },

    /** queries for user */
    userQueries: {
        Insert: InsertQueries.InsertUser,
        Get: GetQueries.GetUser,
        GetAll: GetQueries.GetAllUsers,
        Update: UpdateQueries.UpdateUser,
        Delete: DeleteQueries.DeleteUser,
    },
};
