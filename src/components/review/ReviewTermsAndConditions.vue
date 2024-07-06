<template>
    <div class="col-12">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="termsCheckbox" name="termsCheckbox" required>
            <!-- Label for terms and conditions checkbox -->
            <label class="form-check-label" for="termsCheckbox">Agree to terms and conditions.<span class="text-danger">*</span></label>
            <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
