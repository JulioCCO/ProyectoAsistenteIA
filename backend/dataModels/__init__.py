# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import os
import pickle
import pandas as pd

class dataLoader:
    def __init__(self):
        """
        Initializes the dataLoader class.

        This class is responsible for loading machine learning models from
        pickle files and providing methods for making predictions using those models.
        """
        self.models = self.load_models()

    @staticmethod
    def load_models():
        """
        Loads machine learning models from pickle files.

        This method loads machine learning models from pickle files located in
        a specified directory. The models are stored in a dictionary where the
        keys are the model names and the values are the loaded models.

        Returns:
        - loaded_models (dict): Dictionary containing loaded machine learning models.
        """
        directory_path = r"..\dataModels\models"
        loaded_models = {}
        for filename in os.listdir(directory_path):
            if filename.endswith('.pkl'):
                model_name = filename.split('.')[0]
                file_path = os.path.join(directory_path, filename)
                with open(file_path, 'rb') as file:
                    loaded_model = pickle.load(file)
                    loaded_models[model_name] = loaded_model
        return loaded_models

    def process_SARIMAX(self, model, input_date):
        """
        Makes predictions using the SARIMAX model.

        This method makes predictions using the SARIMAX model for a specified date.
        It retrieves the model corresponding to the provided model name and uses it
        to predict the value for the given date.

        Parameters:
        - model (str): Name of the SARIMAX model to use for prediction.
        - input_date (str): Date for which the prediction is to be made.

        Returns:
        - predicted_value: Predicted value for the specified date.
        """
        try:
            # Convert the input date to a datetime object
            input_datetime = pd.to_datetime(input_date)

            # Make predictions for the specified date
            pred = self.models[model].get_prediction(start=input_datetime, end=input_datetime, dynamic=False)

            # Extract the predicted value for the specified date
            predicted_value = pred.predicted_mean[input_datetime]

            return predicted_value
        except Exception as e:
            print(f"Error predicting with model '{model}': {e}")
            return None

    def recruitment_prediction(self, ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat):
        """
        Makes predictions using the reclutamiento model.

        This method makes predictions using the recluitment model based on the input ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat.
        Parameters:
        - ssc_p (float): Percentage of Secondary Education -10th Grade.
        - hsc_p (float): Percentage of Higher Secondary Education - Grade 12.
        - degree_p (float): Grade Percentage.
        - ssc_b_cat (int(0 , 1)): Board of education ( 0 Central/1 others)
        - hsc_b_cat (int(0 , 1)): Board of education ( 0 Central/1 others)

        Returns:
        - Predicted probability that a student will be placed in a job (True for high, False for low).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'ssc_p': [ssc_p],
                'hsc_p': [hsc_p],
                'degree_p': [degree_p],
                'ssc_b_cat': [ssc_b_cat],
                'hsc_b_cat': [hsc_b_cat]
            })

            # Make predictions using the trained model
            prediction = self.models['reclutamiento'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'stroke': {e}")
            return None

    def heart_prediction(self, age, trtbps, thalachh, exng, oldpeak,slp):
        """
        Makes predictions using the heart model.

        This method makes predictions using the heart model based on the input age, trtbps, thalachh, exng, oldpeak,slp.
        Parameters:
        - age (int): Patient age.
        - trtbps (int): resting blood pressure (in mm Hg) 94-200
        - thalachh (int): maximum heart rate reached 71-202
        - exng (int(0 1)): exercise-induced angina (1 = yes; 0 = no)
        - oldpeak (float): exercise-induced ST segment depression on electrocardiogram (ECG) 0-9
        - slp (int(0 1 2)): type of ST segment slope during exercise

        Returns:
        - Predicted probability that a person will have a heart attack (True for high, False for low).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'age': [age],
                'trtbps': [trtbps],
                'thalachh': [thalachh],
                'exng': [exng],
                'oldpeak': [oldpeak],
                'slp': [slp]
            })

            # Make predictions using the trained model
            prediction = self.models['heart'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'stroke': {e}")
            return None

if __name__ == "__main__":
    # Create an instance of the dataLoader class
    data_loader = dataLoader()

    # Avocado
    avocado_prediction = data_loader.process_SARIMAX('avocado', '2016-01-01')
    print("Avocado Prediction:", avocado_prediction)
    # Test the recruitment_prediction method
    recruitment_prediction = data_loader.recruitment_prediction(80, 65, 90, 1, 0)
    print("Recruitment Prediction:", recruitment_prediction)
    # Test the heart_prediction method
    heart_prediction = data_loader.heart_prediction(60, 65, 101, 1, 2.2, 1)
    print("Heart Prediction:", heart_prediction)


